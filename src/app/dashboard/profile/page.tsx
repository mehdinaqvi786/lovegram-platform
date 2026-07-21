'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useAuth, useUser } from '@clerk/nextjs'
import { ArrowLeft, Mail, Sparkles, User } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function DashboardProfilePage() {
  const { signOut } = useAuth()
  const { user, isLoaded, isSignedIn } = useUser()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }

    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setBio(typeof user.publicMetadata?.bio === 'string' ? user.publicMetadata.bio : '')
  }, [isLoaded, user])

  const email = useMemo(() => {
    if (!user) return ''
    return user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''
  }, [user])

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('Profile saved locally. Live update coming soon.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold">Profile Settings</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Manage your LoveGram presence, update your profile details, and keep your account information fresh.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.DASHBOARD.HOME} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:border-rose-500/30 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
            </Link>
            <Button variant="secondary" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-rose-500/20 text-rose-300">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="text-lg font-semibold text-white">{user?.fullName || 'Profile guest'}</p>
                    <p className="text-sm text-slate-500">{email || 'No email available'}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="First name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name"
                  />
                  <Input
                    label="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name"
                  />
                </div>

                <Input
                  label="Email"
                  value={email}
                  readOnly
                  icon={<Mail className="h-4 w-4" />}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    placeholder="Share a little about yourself"
                    className="w-full min-h-[140px] rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-400">
                    <span className="font-medium text-white">{isSignedIn ? 'Logged in' : 'Not signed in'}</span>
                    {' — your profile data is reflected here.'}
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Save profile
                  </Button>
                </div>

                {statusMessage && (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <Sparkles className="h-5 w-5 text-rose-400" />
                <p className="font-semibold">Profile tips</p>
              </div>
              <ul className="mt-4 space-y-3 text-slate-400 text-sm">
                <li>• Add a warm, authentic bio to express what matters to you.</li>
                <li>• Keep your profile updated for better AI compatibility.</li>
                <li>• Use friendly language and highlight your interests.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Next steps</p>
              <div className="mt-4 space-y-3 text-slate-400 text-sm">
                <p>• Add profile pictures and relationship preferences.</p>
                <p>• Explore matches when your profile is complete.</p>
                <p>• Turn on daily prompts to keep your connection warm.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
