'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <SignIn routing="hash" />
    </div>
  )
}
