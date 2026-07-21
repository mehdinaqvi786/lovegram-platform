'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Clock4, MessageCircle } from 'lucide-react'
import { Button, Input } from '@/components/ui'

type ChatMessage = {
  from: string
  text: string
  time: string
}

export type ThreadData = {
  id: string
  name: string
  preview: string
  messages: ChatMessage[]
}

interface ThreadDetailClientProps {
  thread: ThreadData
}

const getThreadStorageKey = (threadId: string) => `lovergram-thread-${threadId}`
const BROADCAST_CHANNEL = 'lovergram-thread-updates'

export default function ThreadDetailClient({ thread }: ThreadDetailClientProps) {
  const senderId = useRef<string>(crypto.randomUUID?.() ?? Math.random().toString(36).slice(2))
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return thread.messages

    const stored = window.localStorage.getItem(getThreadStorageKey(thread.id))
    if (!stored) return thread.messages

    try {
      return JSON.parse(stored) as ChatMessage[]
    } catch {
      return thread.messages
    }
  })
  const [messageText, setMessageText] = useState('')
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL)
    channelRef.current = channel

    const handleMessage = (event: MessageEvent) => {
      const payload = event.data
      if (!payload || payload.senderId === senderId.current) return
      if (payload.type !== 'new-message' || payload.threadId !== thread.id) return

      setMessages((current) => [...current, payload.message])
    }

    channel.addEventListener('message', handleMessage)

    return () => {
      channel.removeEventListener('message', handleMessage)
      channel.close()
    }
  }, [thread.id])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(getThreadStorageKey(thread.id), JSON.stringify(messages))
  }, [messages, thread.id])

  const sendThreadUpdate = (newMessage: ChatMessage) => {
    if (!channelRef.current) return
    channelRef.current.postMessage({
      type: 'new-message',
      threadId: thread.id,
      message: newMessage,
      senderId: senderId.current,
      preview: newMessage.text,
      time: newMessage.time,
    })
  }

  const handleSendMessage = () => {
    const text = messageText.trim()
    if (!text) return

    const newMessage: ChatMessage = {
      from: 'You',
      text,
      time: 'Just now',
    }

    setMessages((current) => [...current, newMessage])
    setMessageText('')
    sendThreadUpdate(newMessage)
  }

  const threadName = useMemo(() => thread.name || 'Friend', [thread.name])

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 ${
              message.from === 'You'
                ? 'bg-rose-500/10 border border-rose-500/10'
                : 'bg-slate-950/80 border border-white/10'
            }`}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{message.from}</p>
            <p className="mt-3 text-lg font-medium text-white">{message.text}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Clock4 className="h-4 w-4" />
              <span>{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-rose-300">
            <MessageCircle className="h-4 w-4" />
            <span>Write a new message</span>
          </div>
          <Input
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            placeholder="Type your message..."
            className="mt-4 w-full bg-slate-950/90 text-white"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <Button variant="primary" className="w-full" onClick={handleSendMessage}>
            Send message
          </Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-400">
          <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Tip</p>
          <p className="mt-3 leading-7">Ask something that invites a story or shared plan.</p>
        </div>
      </aside>
    </div>
  )
}
