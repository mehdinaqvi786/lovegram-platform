import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getMongoClient } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  try {
    const payload = verifyToken(token)
    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')
    const user = await users.findOne({ _id: new ObjectId(payload.userId) })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture || '',
        bio: user.bio || '',
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    })
  } catch {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

export async function PATCH(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    const body = await request.json()
    const { firstName, lastName, bio, profilePicture } = body

    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First and last name are required' }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')

    const updateResult = await users.updateOne(
      { _id: new ObjectId(payload.userId) },
      {
        $set: {
          firstName,
          lastName,
          bio: bio || '',
          profilePicture: profilePicture || '',
          updatedAt: new Date(),
        },
      }
    )

    if (!updateResult.matchedCount) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
