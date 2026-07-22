import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getMongoClient } from '@/lib/mongodb'
import { signToken } from '@/lib/auth'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bio: z.string().max(250).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signUpSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid signup data' }, { status: 400 })
    }

    const { email, password, firstName, lastName, bio } = parsed.data
    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')

    const existingUser = await users.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const now = new Date()

    const result = await users.insertOne({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      bio: bio || '',
      createdAt: now,
      updatedAt: now,
    })

    const user = {
      id: result.insertedId.toString(),
      email: email.toLowerCase(),
      firstName,
      lastName,
      bio: bio || '',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }

    const token = signToken({ userId: user.id })
    const response = NextResponse.json({ user }, { status: 201 })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to create account. Please check your environment configuration.',
      },
      { status: 500 },
    )
  }
}
