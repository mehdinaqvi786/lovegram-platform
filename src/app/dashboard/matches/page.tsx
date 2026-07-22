'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useCurrentUser } from '@/hooks/useCurrentUser'

type SuggestedUser = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  bio: string
  profilePicture?: string
}

export default function DashboardMatchesPage() {
  const { user, loading } = useCurrentUser()
  const displayName = useMemo(() => user?.firstName || 'Friend', [user])
  const [matches, setMatches] = useState<SuggestedUser[]>([])
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [noMatches, setNoMatches] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('/api/users/suggestions', { credentials: 'include' })
        if (!response.ok) {
          setNoMatches(true)
          return
        }

        const data = await response.json()
        if (Array.isArray(data.users) && data.users.length > 0) {
          setMatches(
            data.users.map((user: any) => ({
              ...user,
              fullName: [user.firstName, user.lastName].filter(Boolean).join(' '),
            }))
          )
        } else {
          setNoMatches(true)
        }
      } catch {
        setNoMatches(true)
      } finally {
        setLoadingMatches(false)
      }
    }

    fetchSuggestions()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Matches</p>
            <h1 className="mt-3 text-4xl font-semibold">Discover your next connection</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              {loading
                ? 'Loading your match suggestions...'
                : `Hi ${displayName}, here are your most compatible matches based on your profile and preferences.`}
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
          {loadingMatches ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center text-slate-400 col-span-full">
              Discovering your next meaningful connection...
            </div>
          ) : noMatches ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center text-slate-400 col-span-full">
              No profiles are available yet. Update your profile to attract real matches and check back soon.
            </div>
          ) : (
            matches.map((match) => (
              <div key={match.id} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-pink-500/20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-3xl bg-rose-500/10 text-white">
                      {match.profilePicture ? (
                        <img src={match.profilePicture} alt={match.fullName} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold">{match.fullName.split(' ').map((part) => part[0]).join('').toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-white">{match.fullName || match.firstName}</p>
                      <p className="mt-1 text-sm text-rose-300">Couple-friendly partner</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-pink-500/10 px-3 py-2 text-sm font-semibold text-pink-200">
                    <Heart className="mr-1 inline-block h-4 w-4" /> Match
                  </div>
                </div>

                <p className="mt-6 text-slate-300">{match.bio}</p>

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
            ))
          )}
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
