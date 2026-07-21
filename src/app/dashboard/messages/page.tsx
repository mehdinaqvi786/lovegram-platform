'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

type ThreadOverview = {
  id: string
  matchId: string
  name: string
  preview: string
  time: string
  unread: number
}

const STORAGE_KEY = 'lovergram-threads'
const BROADCAST_CHANNEL = 'lovergram-thread-updates'

const sampleThreads: ThreadOverview[] = [
  {
    id: 'sofia-thread',
    matchId: 'sofia',
    name: 'Sofia',
    preview: 'Can we meet for coffee this weekend?',
    time: '2h ago',
    unread: 1,
  },
  {
    id: 'ethan-thread',
    matchId: 'ethan',
    name: 'Ethan',
    preview: 'I loved your playlist idea — let’s share favorites!',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 'maya-thread',
    matchId: 'maya',
    name: 'Maya',
    preview: 'How did your weekend getaway go? I want to hear all about it.',
    time: '3d ago',
    unread: 2,
  },
]

const loadThreads = (): ThreadOverview[] => {
  if (typeof window === 'undefined') return sampleThreads
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return sampleThreads

  try {
    return JSON.parse(stored) as ThreadOverview[]
  } catch {
    return sampleThreads
  }
}

export default function DashboardMessagesPage() {
  const { user, isLoaded } = useUser()
  const displayName = useMemo(() => user?.firstName || 'Friend', [user])
  const [threads, setThreads] = useState<ThreadOverview[]>(loadThreads)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads))
  }, [threads])

  useEffect(() => {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL)

    const handleMessage = (event: MessageEvent) => {
      const payload = event.data
      if (!payload || payload.type !== 'new-message') return

      setThreads((current) =>
        current.map((thread) => {
          if (thread.id !== payload.threadId) return thread

          return {
            ...thread,
            preview: payload.preview,
            time: payload.time,
            unread: thread.unread + 1,
          }
        })
      )
    }

    channel.addEventListener('message', handleMessage)
    return () => {
      channel.removeEventListener('message', handleMessage)
      channel.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Messages</p>
            <h1 className="mt-3 text-4xl font-semibold">Stay connected</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              {isLoaded
                ? `${displayName}, these are your recent conversations on LoveGram.`
                : 'Loading your message threads...'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.HOME} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {threads.map((thread) => (
            <div key={thread.id} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{thread.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{thread.preview}</p>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <p>{thread.time}</p>
                  {thread.unread > 0 && (
                    <span className="mt-2 inline-flex rounded-full bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-200">
                      {thread.unread} new
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`${ROUTES.DASHBOARD.MESSAGES}/${thread.id}`} className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Continue chat
                  </Button>
                </Link>
                <Link href={`${ROUTES.DASHBOARD.MATCHES}/${thread.matchId}`} className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    View profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-slate-400">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-pink-300">
            <MessageCircle className="h-4 w-4" />
            <span>Message tips</span>
          </div>
          <p className="mt-3 leading-7">
            Send thoughtful messages that are warm, authentic, and invite curiosity. A simple compliment or question often starts the best conversations.
          </p>
        </div>
      </div>
    </div>
  )
}
