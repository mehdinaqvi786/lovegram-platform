import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getMongoClient } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ threads: [] }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    const client = await getMongoClient()
    const db = client.db()
    const threads = db.collection('threads')

    const userThreads = await threads
      .find({ participants: new ObjectId(payload.userId) })
      .sort({ updatedAt: -1 })
      .toArray()

    return NextResponse.json({
      threads: userThreads.map((thread) => {
        const participantName = thread.participantName || 'New connection'
        const lastMessage = thread.lastMessage
        const lastMessageSender = lastMessage?.senderId === payload.userId ? 'You' : lastMessage?.senderName || participantName
        const previewText = lastMessage?.text ? `${lastMessageSender}: ${lastMessage.text}` : 'Say hello to start the chat.'

        return {
          id: thread._id.toString(),
          matchId: thread.matchId?.toString(),
          name: participantName,
          preview: previewText,
          lastMessageSender,
          time: lastMessage?.time || 'Just now',
          unread: thread.unread || 0,
          messages: thread.messages || [],
        }
      }),
    })
  } catch {
    return NextResponse.json({ threads: [] }, { status: 401 })
  }
}

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const tokenMatch = cookie.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    const body = await request.json()
    const { threadId, matchId, participantName, message } = body

    if (!message?.text) {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db()
    const threads = db.collection('threads')

    const threadObjId = threadId && ObjectId.isValid(threadId) ? new ObjectId(threadId) : new ObjectId()

    const currentUser = await db.collection('users').findOne({ _id: new ObjectId(payload.userId) }, { projection: { firstName: 1 } })
    const senderName = currentUser?.firstName || 'You'

    const newMessage = {
      senderId: payload.userId,
      senderName,
      text: message.text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(),
    }

    let participantNameValue = participantName
    if (!participantNameValue && matchId && ObjectId.isValid(matchId)) {
      const otherUser = await db.collection('users').findOne({ _id: new ObjectId(matchId) }, { projection: { firstName: 1, lastName: 1 } })
      if (otherUser) {
        participantNameValue = [otherUser.firstName, otherUser.lastName].filter(Boolean).join(' ')
      }
      participantNameValue = participantNameValue || 'Unknown'
    }

    const existingThread = threadId && ObjectId.isValid(threadId)
      ? await threads.findOne({ _id: threadObjId })
      : null

    let participants = [new ObjectId(payload.userId)]
    if (matchId && ObjectId.isValid(matchId) && matchId !== payload.userId) {
      participants.push(new ObjectId(matchId))
    }

    if (existingThread) {
      const existingParticipants = Array.isArray(existingThread.participants)
        ? existingThread.participants.map((participant: any) => participant.toString())
        : []

      if (!existingParticipants.includes(payload.userId)) {
        participants = [
          ...existingThread.participants,
          new ObjectId(payload.userId),
        ]
      } else {
        participants = existingThread.participants
      }
    }

    const updateDocument: any = {
      $set: {
        lastMessage: newMessage,
        updatedAt: new Date(),
      },
      $push: {
        messages: newMessage,
      },
      $setOnInsert: {
        participants,
        matchId: matchId && ObjectId.isValid(matchId) ? new ObjectId(matchId) : undefined,
        participantName: participantNameValue || 'Unknown',
        createdAt: new Date(),
      },
    }

    const result = await threads.updateOne(
      { _id: threadObjId },
      updateDocument,
      {
        upsert: true,
      }
    )

    return NextResponse.json({
      threadId: threadObjId.toString(),
      message: newMessage,
    })
  } catch (error) {
    console.error('Messages API error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
