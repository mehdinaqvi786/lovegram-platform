import Link from 'next/link'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { ArrowLeft } from 'lucide-react'
import { ObjectId } from 'mongodb'
import { ROUTES } from '@/constants'
import { getMongoClient } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import ThreadDetailClient, { ThreadData } from './ThreadDetailClient'

async function getThreadData(threadId: string, userId: string): Promise<ThreadData | null> {
  try {
    const client = await getMongoClient()
    const db = client.db()
    const threads = db.collection('threads')
    const users = db.collection('users')

    let thread = null
    const currentUserId = new ObjectId(userId)
    const userThreadId = ObjectId.isValid(threadId) ? new ObjectId(threadId) : null

    if (userThreadId) {
      thread = await threads.findOne({ _id: userThreadId, participants: currentUserId })
    }

    const isMatchUserId = userThreadId && threadId !== userId

    const otherUser = isMatchUserId ? await users.findOne({ _id: userThreadId }) : null
    if (!thread && isMatchUserId && otherUser) {
      thread = await threads.findOne({
        participants: { $all: [currentUserId, userThreadId!] },
      })
    }

    if (!thread && isMatchUserId && otherUser) {
      const insertResult = await threads.insertOne({
        participants: [currentUserId, userThreadId],
        matchId: userThreadId,
        participantName: otherUser.firstName || 'Unknown',
        messages: [],
        lastMessage: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      thread = await threads.findOne({ _id: insertResult.insertedId })
    }

    if (!thread) return null

    const otherParticipantId = thread.participants?.find((id: any) => id.toString() !== userId)
    let participantName = thread.participantName || 'Unknown'

    if (otherParticipantId) {
      const otherUser = await users.findOne({ _id: otherParticipantId })
      if (otherUser) {
        participantName = [otherUser.firstName, otherUser.lastName].filter(Boolean).join(' ') || 'Unknown'
      }
    }

    return {
      id: thread._id.toString(),
      name: participantName,
      preview: thread.lastMessage?.text || '',
      messages: (thread.messages || []).map((msg: any) => ({
        from: msg.senderId === userId ? 'You' : msg.senderName || participantName,
        text: msg.text || '',
        time: msg.time || 'unknown',
      })),
    }
  } catch {
    return null
  }
}

interface ThreadDetailPageProps {
  params: Promise<{
    threadId: string
  }>
}

export default async function ThreadDetailPage({ params }: ThreadDetailPageProps) {
  const { threadId } = await params

  const headersList = await headers()
  const cookieHeader = headersList.get('cookie') || ''
  const tokenMatch = cookieHeader.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  let userId = ''
  if (token) {
    try {
      const payload = verifyToken(token)
      userId = payload.userId
    } catch {
      notFound()
    }
  } else {
    notFound()
  }

  const thread = await getThreadData(threadId, userId)

  if (!thread) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Conversation</p>
            <h1 className="mt-3 text-4xl font-semibold">{thread.name}</h1>
            <p className="mt-2 max-w-2xl text-slate-400">Continue your conversation with a thoughtful follow-up message.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.MESSAGES} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to messages
            </Link>
          </div>
        </div>

        <ThreadDetailClient thread={thread} />
      </div>
    </div>
  )
}
