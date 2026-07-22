import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getMongoClient } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ users: [] }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')

    const suggestions = await users
      .find({ _id: { $ne: new ObjectId(payload.userId) } })
      .project({ passwordHash: 0 })
      .limit(6)
      .toArray()

    const suggestionUsers = suggestions.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(' '),
      profilePicture: user.profilePicture || '',
      bio: user.bio || '',
    }))

    const sampleProfiles = [
      {
        id: 'sample-1',
        email: 'sara.ali@example.com',
        firstName: 'Sara',
        lastName: 'Ali',
        fullName: 'Sara Ali',
        profilePicture: '',
        bio: 'Loves quiet date nights, poetry, and planning romantic surprises.',
      },
      {
        id: 'sample-2',
        email: 'maya.khan@example.com',
        firstName: 'Maya',
        lastName: 'Khan',
        fullName: 'Maya Khan',
        profilePicture: '',
        bio: 'Enjoys weekend getaways, cooking together, and meaningful conversations.',
      },
      {
        id: 'sample-3',
        email: 'leila.aslam@example.com',
        firstName: 'Leila',
        lastName: 'Aslam',
        fullName: 'Leila Aslam',
        profilePicture: '',
        bio: 'A warm heart looking for a partner who values trust, growth, and laughter.',
      },
    ]

    return NextResponse.json({
      users: suggestionUsers.length > 0 ? suggestionUsers : sampleProfiles,
    })
  } catch {
    return NextResponse.json({ users: [] }, { status: 401 })
  }
}
