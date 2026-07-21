'use client'

import { SignIn } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_FRONTEND_API

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Clerk frontend key (client):', clerkKey)
  }, [clerkKey])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4">
      {!clerkKey ? (
        <div className="max-w-xl p-6 bg-slate-800/60 rounded-lg text-center">
          <h2 className="text-2xl font-semibold">Clerk Not Configured</h2>
          <p className="mt-2 text-sm text-slate-300">
            The sign-in widget cannot load because Clerk environment variables are
            missing. Ensure <strong>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</strong> or
            <strong> NEXT_PUBLIC_CLERK_FRONTEND_API</strong> is set in your Vercel
            Project Environment Variables.
          </p>
        </div>
      ) : (
        <SignIn routing="hash" />
      )}
    </div>
  )
}
