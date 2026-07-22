import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getMongoClient } from '@/lib/mongodb'
import { signToken } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid login data' }, { status: 400 })
    }

    const { email, password } = parsed.data
    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')

    const user = await users.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatches) {
      return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 })
    }

    const responseUser = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio || '',
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }

    const token = signToken({ userId: responseUser.id })
    const response = NextResponse.json({ user: responseUser }, { status: 200 })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to log in. Please check your environment configuration.',
      },
      { status: 500 },
    )
  }
}
