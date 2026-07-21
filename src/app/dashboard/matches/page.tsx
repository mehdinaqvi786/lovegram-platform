'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

const sampleMatches = [
  {
    id: 'sofia',
    name: 'Sofia',
    age: 27,
    location: 'Lisbon',
    compatibility: 92,
    highlight: 'Shares your love of sunrise walks and cozy coffee dates.',
  },
  {
    id: 'ethan',
    name: 'Ethan',
    age: 29,
    location: 'Barcelona',
    compatibility: 88,
    highlight: 'Passionate about music, travel, and meaningful conversations.',
  },
  {
    id: 'maya',
    name: 'Maya',
    age: 25,
    location: 'Berlin',
    compatibility: 94,
    highlight: 'A thoughtful soul who values honesty, adventure, and quiet nights in.',
  },
]

export default function DashboardMatchesPage() {
  const { user, isLoaded } = useUser()
  const displayName = useMemo(() => user?.firstName || 'Friend', [user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Matches</p>
            <h1 className="mt-3 text-4xl font-semibold">Discover your next connection</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              {isLoaded
                ? `Hi ${displayName}, here are your most compatible matches based on your profile and preferences.`
                : 'Loading your match suggestions...'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.HOME} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
            </Link>
            <Link href={ROUTES.DASHBOARD.PROFILE} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <Star className="mr-2 h-4 w-4 text-rose-400" /> Edit profile
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sampleMatches.map((match) => (
            <div key={match.id} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-rose-500/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-white">{match.name}, {match.age}</p>
                  <p className="mt-1 text-sm text-slate-400">{match.location}</p>
                </div>
                <div className="rounded-3xl bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-300">
                  {match.compatibility}%
                </div>
              </div>

              <p className="mt-6 text-slate-300">{match.highlight}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`${ROUTES.DASHBOARD.MATCHES}/${match.id}`} className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Message
                  </Button>
                </Link>
                <Link href={`${ROUTES.DASHBOARD.MATCHES}/${match.id}`} className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full sm:w-auto">
                    View profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-slate-400">
          <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Tip</p>
          <p className="mt-3 leading-7">
            Update your profile regularly to keep match recommendations aligned with your mood and relationship goals.
          </p>
        </div>
      </div>
    </div>
  )
}
