import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/constants'
import ThreadDetailClient, { ThreadData } from './ThreadDetailClient'

const threadDetails: ThreadData[] = [
  {
    id: 'sofia-thread',
    name: 'Sofia',
    preview: 'Can we meet for coffee this weekend?',
    messages: [
      { from: 'Sofia', text: 'I would love that. I know a cozy place by the river.', time: '2h ago' },
      { from: 'You', text: 'That sounds perfect. Saturday afternoon work for you?', time: '1h ago' },
    ],
  },
  {
    id: 'ethan-thread',
    name: 'Ethan',
    preview: 'I loved your playlist idea — let’s share favorites!',
    messages: [
      { from: 'Ethan', text: 'I made a new playlist of songs for our next road trip.', time: 'Yesterday' },
      { from: 'You', text: 'I can’t wait to hear it. Send it over!', time: 'Yesterday' },
    ],
  },
  {
    id: 'maya-thread',
    name: 'Maya',
    preview: 'How did your weekend getaway go? I want to hear all about it.',
    messages: [
      { from: 'Maya', text: 'I hope your trip was magical. Tell me everything!', time: '3d ago' },
      { from: 'You', text: 'It was beautiful. I’ll share photos and stories tonight.', time: '2d ago' },
    ],
  },
]

interface ThreadDetailPageProps {
  params: Promise<{
    threadId: string
  }>
}

export default async function ThreadDetailPage({ params }: ThreadDetailPageProps) {
  const { threadId } = await params
  const thread = threadDetails.find((item) => item.id === threadId)

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
