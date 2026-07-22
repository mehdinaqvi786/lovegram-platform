import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getMongoClient } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request, context: { params: Promise<{ threadId: string }> }) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ messages: [] }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    const params = await context.params
    const threadId = params.threadId

    if (!threadId || !ObjectId.isValid(threadId)) {
      return NextResponse.json({ messages: [] }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db()
    const threads = db.collection('threads')
    const users = db.collection('users')

    const thread = await threads.findOne({
      _id: new ObjectId(threadId),
      participants: new ObjectId(payload.userId),
    })

    if (!thread) {
      return NextResponse.json({ messages: [], participantName: 'New connection' }, { status: 404 })
    }

    const otherParticipantId = thread.participants?.find((id: any) => id.toString() !== payload.userId)
    let participantName = thread.participantName || 'New connection'
    let otherUser: any = null

    if (otherParticipantId) {
      otherUser = await users.findOne({ _id: otherParticipantId })
      if (otherUser) {
        participantName = [otherUser.firstName, otherUser.lastName].filter(Boolean).join(' ') || 'New connection'
      }
    }

    const messages = (thread.messages || []).map((msg: any) => {
      const isCurrentUser = msg.senderId === payload.userId
      return {
        from: isCurrentUser ? 'You' : msg.senderName || participantName,
        text: msg.text || '',
        time: msg.time || 'Just now',
        timestamp: msg.timestamp || new Date(),
      }
    })

    return NextResponse.json({
      messages,
      participantName,
      lastMessage: thread.lastMessage,
    })
  } catch (error) {
    console.error('Fetch messages error:', error)
    return NextResponse.json({ messages: [], participantName: 'Unknown' }, { status: 500 })
  }
}
