'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui'

export default function SignUpPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, bio }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Unable to create account.')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/30">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Create your LoveGram account</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Sign up and start connecting</h1>
          <p className="mt-3 text-slate-400">Real users, real chat, and real match suggestions powered by MongoDB.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300">
              First name
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-rose-500"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Last name
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-rose-500"
              />
            </label>
          </div>

          <label className="block text-sm text-slate-300">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-rose-500"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-rose-500"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-rose-500"
              placeholder="Tell people what makes you special"
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  )
}
