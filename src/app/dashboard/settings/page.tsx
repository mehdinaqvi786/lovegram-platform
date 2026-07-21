'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useAuth, useUser } from '@clerk/nextjs'
import { ArrowLeft, Bell, Lock, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function DashboardSettingsPage() {
  const { signOut } = useAuth()
  const { user, isLoaded } = useUser()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [privateProfile, setPrivateProfile] = useState(false)

  const displayName = useMemo(() => user?.firstName || 'Friend', [user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container-app py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Settings</p>
            <h1 className="mt-3 text-4xl font-semibold">Account preferences</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              {isLoaded
                ? `Manage your experience, notification settings, and privacy controls, ${displayName}.`
                : 'Loading your settings...'}
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

        <div className="grid gap-8 xl:grid-cols-[0.7fr_0.5fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Personalization</p>
                <p className="mt-3 text-slate-400">Adjust the experience that fits your mood and relationship journey.</p>
              </div>

              <div className="grid gap-6">
                <label className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-5">
                  <div className="rounded-2xl bg-rose-500/10 p-3 text-rose-300">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Notifications</p>
                    <p className="text-sm text-slate-400">Receive love reminders and match updates.</p>
                  </div>
                  <button
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${notifications ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                    onClick={() => setNotifications(!notifications)}
                  >
                    {notifications ? 'On' : 'Off'}
                  </button>
                </label>

                <label className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-5">
                  <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
                    {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Dark mode</p>
                    <p className="text-sm text-slate-400">Keep the app cozy and easy on the eyes.</p>
                  </div>
                  <button
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${darkMode ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? 'Enabled' : 'Disabled'}
                  </button>
                </label>

                <label className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-5">
                  <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Private profile</p>
                    <p className="text-sm text-slate-400">Control who sees your profile details.</p>
                  </div>
                  <button
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${privateProfile ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                    onClick={() => setPrivateProfile(!privateProfile)}
                  >
                    {privateProfile ? 'Enabled' : 'Disabled'}
                  </button>
                </label>
              </div>
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Account</p>
              <p className="mt-4 text-slate-400">Maintain your account preferences and security essentials.</p>
            </div>
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div>
                <p className="text-sm text-slate-400">Full name</p>
                <p className="mt-2 text-lg font-semibold text-white">{user?.fullName || 'Your name'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="mt-2 text-lg font-semibold text-white">{user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || 'No email available'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Account status</p>
                <p className="mt-2 text-lg font-semibold text-white">{String(user?.unsafeMetadata?.accountStatus ?? 'Active')}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-400">
              <p className="text-sm uppercase tracking-[0.24em] text-rose-300">Next</p>
              <p className="mt-3 leading-7">
                Use the settings page to personalize your LoveGram experience and keep your account secure.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
