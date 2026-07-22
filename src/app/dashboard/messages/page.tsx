'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useCurrentUser } from '@/hooks/useCurrentUser'

type ThreadOverview = {
  id: string
  matchId: string
  name: string
  preview: string
  time: string
  unread: number
  lastMessageSender?: string
}

const BROADCAST_CHANNEL = 'lovergram-thread-updates'

export default function DashboardMessagesPage() {
  const { user, loading } = useCurrentUser()
  const displayName = useMemo(() => user?.firstName || 'Friend', [user])
  const [threads, setThreads] = useState<ThreadOverview[]>([])
  const [threadLoading, setThreadLoading] = useState(true)

  useEffect(() => {
    const fetchThreads = async () => {
      setThreadLoading(true)
      try {
        const response = await fetch('/api/messages', {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setThreads(data.threads || [])
        }
      } catch (error) {
        console.error('Failed to load message threads:', error)
      } finally {
        setThreadLoading(false)
      }
    }

    fetchThreads()
  }, [])

  useEffect(() => {
    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel(BROADCAST_CHANNEL)
    } catch (err) {
      channel = null
    }

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

    if (channel) {
      channel.addEventListener('message', handleMessage)
    }

    return () => {
      if (channel) {
        channel.removeEventListener('message', handleMessage)
        channel.close()
      }
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
              {loading
                ? 'Loading your message threads...'
                : `${displayName}, these are your recent conversations on LoveGram.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.HOME} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {threadLoading ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center text-slate-400">
              Loading your conversations...
            </div>
          ) : threads.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center text-slate-400">
              <p className="text-lg font-medium text-white">No conversations yet.</p>
              <p className="mt-3">You have no active chats right now. Browse matches and start a meaningful conversation.</p>
              <div className="mt-6">
                <Link href={ROUTES.DASHBOARD.MATCHES} className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
                  Browse matches
                </Link>
              </div>
            </div>
          ) : (
            threads.map((thread) => (
              <div key={thread.id} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-rose-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-rose-200">
                        {thread.lastMessageSender || 'New chat'}
                      </span>
                      <h2 className="text-2xl font-semibold text-white">{thread.name}</h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-slate-400">
                      {thread.preview || 'No messages yet — say hello to get the conversation started.'}
                    </p>
                  </div>

                  <div className="text-right text-sm text-slate-400">
                    <p>{thread.time || 'Just now'}</p>
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
                  {thread.matchId && (
                    <Link href={`${ROUTES.DASHBOARD.MATCHES}/${thread.matchId}`} className="w-full sm:w-auto">
                      <Button variant="secondary" className="w-full sm:w-auto">
                        View profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
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
