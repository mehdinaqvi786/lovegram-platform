'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Sparkles, User } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useAuthClient } from '@/hooks/useCurrentUser'

export default function DashboardProfilePage() {
  const { signOut, user, loading, refresh } = useAuthClient()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
  const [bio, setBio] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setProfilePicture(user.profilePicture || '')
      setBio(user.bio || '')
    }
  }, [loading, user])

  const email = useMemo(() => user?.email || '', [user])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setProfilePictureFile(file)

    if (!file) {
      setProfilePicture('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePicture(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setStatusMessage('')

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName, bio, profilePicture }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        setStatusMessage(result?.error || 'Unable to save profile. Please try again.')
      } else {
        setStatusMessage(
          profilePictureFile
            ? 'Your profile and new picture have been uploaded successfully.'
            : 'Your profile is updated — perfect for couples exploring LoveGram.'
        )
        refresh()
      }
    } catch (error) {
      console.error('Profile save failed:', error)
      setStatusMessage('Unable to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Couples profile</p>
            <h1 className="mt-3 text-4xl font-semibold">Create your LoveGram love story</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Build a real profile that feels personal, romantic, and ready for meaningful connections.
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

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-rose-500/10 bg-rose-500/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-pink-300">LoveGram profile</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Your profile is your first love letter.</h2>
                <p className="mt-3 text-slate-400 leading-7">
                  Share the story of who you are, what you care about, and what you want from your next meaningful connection.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-950/80 ring-1 ring-white/10">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-rose-500/20 text-rose-300">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="text-lg font-semibold text-white">{user ? `${user.firstName} ${user.lastName}` : 'Profile guest'}</p>
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

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Profile picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-3xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-slate-100 file:border-0 file:bg-rose-500/10 file:px-3 file:py-2 file:text-sm file:text-rose-100 file:transition hover:file:bg-rose-400/20"
                  />
                  {profilePicture && (
                    <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
                      <img src={profilePicture} alt="Selected profile" className="h-40 w-full object-cover" />
                    </div>
                  )}
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
                    placeholder="Share your relationship story, values, and what you love most."
                    className="w-full min-h-[160px] rounded-3xl border border-slate-700 bg-slate-900/50 px-4 py-4 text-slate-100 placeholder:text-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-400">
                    <span className="font-medium text-white">{user ? 'Ready to share' : 'Not signed in'}</span>
                    {' — keep your profile updated for better matches.'}
                  </div>
                  <Button type="submit" className="w-full sm:w-auto" disabled={saving}>
                    {saving ? 'Saving...' : 'Save profile'}
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
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Couples-ready profile</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Make your profile glow</h3>
              <p className="mt-3 text-slate-400 leading-7">
                A thoughtful bio and accurate name details help LoveGram introduce you to compatible partners who value intimacy and real connection.
              </p>
              <div className="mt-6 grid gap-3">
                <span className="inline-flex items-center gap-2 rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" /> Heartfelt honesty
                </span>
                <span className="inline-flex items-center gap-2 rounded-3xl bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-300" /> Real relationship values
                </span>
                <span className="inline-flex items-center gap-2 rounded-3xl bg-fuchsia-500/10 px-4 py-3 text-sm text-fuchsia-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" /> Feel-good connection prompts
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Profile preview</p>
              <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6">
                <p className="text-2xl font-semibold text-white">{user ? `${user.firstName} ${user.lastName}` : 'Your name here'}</p>
                <p className="mt-2 text-sm text-slate-500">Couples connection seeker</p>
                <div className="mt-4 rounded-3xl bg-slate-950/90 p-4 text-slate-200 text-sm leading-6">
                  {bio || 'Share your favorite date idea, your relationship values, and what makes your heart feel safe.'}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

