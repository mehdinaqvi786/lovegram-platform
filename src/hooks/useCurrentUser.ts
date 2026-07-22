'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export type CurrentUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  profilePicture?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      if (!response.ok) {
        setUser(null)
        return
      }

      const result = await response.json()
      setUser(result.user ?? null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const isSignedIn = useMemo(() => !!user && !loading, [user, loading])

  return {
    user,
    loading,
    isSignedIn,
    refresh: fetchUser,
  }
}

export function useAuthClient() {
  const { user, loading, isSignedIn, refresh } = useCurrentUser()

  const signOut = useCallback(async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    window.location.href = '/auth/log-in'
  }, [])

  return {
    user,
    loading,
    isSignedIn,
    signOut,
    refresh,
  }
}
