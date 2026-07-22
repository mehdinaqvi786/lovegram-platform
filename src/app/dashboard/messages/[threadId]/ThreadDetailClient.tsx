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
  const [messages, setMessages] = useState<ChatMessage[]>(thread.messages)
  const [messageText, setMessageText] = useState('')
  const [participantName, setParticipantName] = useState(thread.name)
  const [isFetching, setIsFetching] = useState(false)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch messages from API
  const fetchMessages = async () => {
    if (isFetching) return
    setIsFetching(true)

    try {
      const response = await fetch(`/api/messages/${thread.id}`, {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
        if (data.participantName) {
          setParticipantName(data.participantName)
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsFetching(false)
    }
  }

  // Initialize polling and BroadcastChannel
  useEffect(() => {
    // Fetch messages immediately
    fetchMessages()

    // Set up polling every 2 seconds for real-time updates
    pollingIntervalRef.current = setInterval(() => {
      fetchMessages()
    }, 2000)

    // Set up BroadcastChannel for same-browser updates
    try {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL)
      channelRef.current = channel

      const handleMessage = (event: MessageEvent) => {
        const payload = event.data
        if (!payload || payload.senderId === senderId.current) return
        if (payload.type !== 'new-message' || payload.threadId !== thread.id) return

        // Update local state immediately for same-browser
        setMessages((current) => {
          // Check if message already exists
          const messageExists = current.some(
            (msg) => msg.text === payload.message.text && msg.time === payload.message.time
          )
          if (messageExists) return current
          return [...current, payload.message]
        })
      }

      channel.addEventListener('message', handleMessage)

      return () => {
        channel.removeEventListener('message', handleMessage)
        channel.close()
        channelRef.current = null
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current)
        }
      }
    } catch (err) {
      // BroadcastChannel not available; rely on polling
      channelRef.current = null
      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current)
        }
      }
    }
  }, [thread.id])

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

  const handleSendMessage = async () => {
    const text = messageText.trim()
    if (!text) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          threadId: thread.id,
          message: { text },
        }),
      })

      if (!response.ok) {
        console.error('Failed to send message')
        return
      }

      const data = await response.json()
      const newMessage: ChatMessage = {
        from: 'You',
        text,
        time: data.message.time || 'Just now',
      }

      setMessages((current) => [...current, newMessage])
      setMessageText('')
      sendThreadUpdate(newMessage)

      // Fetch latest messages to ensure sync
      setTimeout(() => fetchMessages(), 500)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const threadName = useMemo(() => participantName || 'Friend', [participantName])

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <div className="rounded-[2rem] border border-rose-500/10 bg-rose-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-rose-300">Chat partner</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{threadName}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Keep the conversation warm and authentic. LoveGram saves this chat securely so you can follow up any time.
          </p>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 py-16">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-white">No messages yet.</p>
              <p className="mt-3 max-w-xl mx-auto">Send the first message and start a story together.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-3xl p-6 shadow-sm ${
                    message.from === 'You'
                      ? 'bg-gradient-to-br from-rose-500/20 to-pink-500/15 text-white'
                      : 'bg-slate-950/90 border border-white/10 text-slate-100'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{message.from}</p>
                  <p className="mt-3 text-lg leading-8">{message.text}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>{message.time}</span>
                    <span>{message.from === 'You' ? 'Sent' : 'Received'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Type your message..."
            className="mt-4 w-full bg-slate-950/90 text-white"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            Send message
          </Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-400">
          <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Tip</p>
          <p className="mt-3 leading-7">Ask something that invites a story or shared plan.</p>
        </div>

        {isFetching && (
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-500 text-center">
            Syncing messages...
          </div>
        )}
      </aside>
    </div>
  )
}
