import Link from 'next/link'
import { ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'
import { ArrowLeft, Heart, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { getMongoClient } from '@/lib/mongodb'

interface MatchDetailPageProps {
  params: Promise<{
    matchId: string
  }>
}

async function getMatchProfile(matchId: string) {
  if (!ObjectId.isValid(matchId)) {
    return null
  }

  try {
    const client = await getMongoClient()
    const db = client.db()
    const users = db.collection('users')
    const user = await users.findOne({ _id: new ObjectId(matchId) }, { projection: { passwordHash: 0 } })
    if (!user) return null

    return {
      id: user._id.toString(),
      name: user.firstName,
      age: 27,
      location: 'Unknown',
      compatibility: 88,
      bio: user.bio || 'Looking for a great connection.',
      interests: ['Shared interests', 'Conversation', 'Connection'],
      message: `Hi ${user.firstName}, I’d love to learn more about what makes you smile.`,
    }
  } catch {
    return null
  }
}

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const { matchId } = await params
  const match = await getMatchProfile(matchId)

  if (!match) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Match profile</p>
            <h1 className="mt-3 text-4xl font-semibold">{match.name}</h1>
            <p className="mt-2 max-w-2xl text-slate-400">Review the details for this match and send a personalized message.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.MATCHES} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to matches
            </Link>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_0.6fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">{match.name}, {match.age}</p>
                <p className="mt-2 text-slate-400">{match.location}</p>
              </div>
              <div className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300">
                {match.compatibility}% compatibility
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Bio</p>
                <p className="mt-4 text-slate-300 leading-7">{match.bio}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Message idea</p>
                <p className="mt-4 text-slate-300 leading-7">{match.message}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-rose-300">Common interests</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {match.interests.map((interest) => (
                  <span key={interest} className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-rose-300">Next step</p>
              <p className="mt-4 text-slate-400 leading-7">Send a warm message, mention something you noticed, and ask a gentle question.</p>
              <Link href={`${ROUTES.DASHBOARD.MESSAGES}/${match.id}`} className="mt-6 block">
                <Button variant="primary" className="w-full">
                  Message {match.name}
                </Button>
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-400">
              <div className="flex items-center gap-3 text-sm">
                <Heart className="h-4 w-4 text-rose-400" />
                <span>Save to favorites</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />
                <span>Add to your love list</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Plan a local date idea</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
