'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function DashboardHome() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <nav className="border-b border-slate-800/50">
        <div className="container-app py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">LoveGram Dashboard</h1>
          <Button onClick={() => signOut()} variant="secondary">
            Sign Out
          </Button>
        </div>
      </nav>

      <section className="container-app py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to LoveGram!</h2>
          <p className="text-slate-400">Your connection dashboard is ready. Explore matches, messages, and profile settings.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Profile</h3>
            <p className="text-slate-400 mb-4">Complete your profile</p>
            <Link href={ROUTES.DASHBOARD.PROFILE}>
              <Button variant="secondary" className="w-full">
                Go to Profile
              </Button>
            </Link>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Matches</h3>
            <p className="text-slate-400 mb-4">Browse your best matches</p>
            <Link href={ROUTES.DASHBOARD.MATCHES}>
              <Button variant="primary" className="w-full">
                View Matches
              </Button>
            </Link>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-slate-400 mb-4">Continue your conversations</p>
            <Link href={ROUTES.DASHBOARD.MESSAGES}>
              <Button variant="secondary" className="w-full">
                Open Messages
              </Button>
            </Link>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-slate-400 mb-4">Manage account and preferences</p>
            <Link href={ROUTES.DASHBOARD.SETTINGS}>
              <Button variant="ghost" className="w-full">
                Open Settings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
