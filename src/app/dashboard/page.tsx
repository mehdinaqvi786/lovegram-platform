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
          <p className="text-slate-400">Your dashboard is under construction</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Profile</h3>
            <p className="text-slate-400 mb-4">Complete your profile</p>
            <Link href={ROUTES.DASHBOARD.PROFILE}>
              <Button variant="secondary" className="w-full">
                Go to Profile
              </Button>
            </Link>
          </div>

          <div className="card p-6 text-center opacity-50">
            <h3 className="text-xl font-semibold mb-2">Matches</h3>
            <p className="text-slate-400 mb-4">Coming soon</p>
          </div>

          <div className="card p-6 text-center opacity-50">
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-slate-400 mb-4">Coming soon</p>
          </div>
        </div>
      </section>
    </div>
  )
}
