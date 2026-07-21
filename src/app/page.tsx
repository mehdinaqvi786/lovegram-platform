'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@clerk/nextjs'
import { Heart, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

const featureCards = [
  {
    icon: <Zap className="w-8 h-8 text-rose-500" />,
    title: 'AI Compatibility Score',
    description: 'Get instant compatibility analysis with detailed insights',
    href: ROUTES.FEATURES.COMPATIBILITY,
  },
  {
    icon: <Sparkles className="w-8 h-8 text-rose-500" />,
    title: 'Daily Icebreakers',
    description: 'Receive 5 unique conversation starters every day',
    href: ROUTES.FEATURES.ICEBREAKER,
  },
  {
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    title: 'Love Passport',
    description: 'Track your relationship journey and shared dreams',
    href: ROUTES.FEATURES.PASSPORT,
  },
]

const floatTransition: any = {
  duration: 8,
  repeat: Infinity,
  ease: 'easeInOut',
}

export default function Home() {
  const { isSignedIn } = useAuth()
  const destinationRoute = isSignedIn ? ROUTES.DASHBOARD.HOME : ROUTES.AUTH.SIGN_UP

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-900">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_20%)]"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      <motion.div
        className="absolute left-12 top-24 h-24 w-24 rounded-full bg-rose-500/10 blur-3xl"
        animate={{ y: [0, -24, 0] }}
        transition={floatTransition}
      />
      <motion.div
        className="absolute right-16 top-32 h-20 w-20 rounded-full bg-fuchsia-500/15 blur-3xl"
        animate={{ y: [0, -24, 0] }}
        transition={{ ...floatTransition, delay: 2, duration: 10 }}
      />
      <motion.div
        className="absolute left-1/2 top-12 h-20 w-20 rounded-full bg-rose-500/10 blur-3xl"
        animate={{ y: [0, -24, 0] }}
        transition={{ ...floatTransition, delay: 1, duration: 9 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/50"
      >
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span className="text-2xl font-bold gradient-text">LoveGram</span>
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <Link href={ROUTES.DASHBOARD.HOME}>
              <Button variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href={ROUTES.AUTH.LOG_IN}>
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href={ROUTES.AUTH.SIGN_UP}>
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </motion.nav>

      <section className="container-app py-20 md:py-32 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5"
            >
              <p className="text-sm text-rose-300">✨ The Future of Love</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Find <span className="gradient-text">Your Perfect Match</span> With AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="text-xl text-slate-400 leading-relaxed"
            >
              LoveGram is the most beautiful, emotional, and interactive AI-powered relationship platform. Discover meaningful connections with advanced compatibility matching and relationship insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
                <Link href={destinationRoute}>
                <Button className="btn-primary w-full sm:w-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Exploring
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/50"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold text-rose-400">10K+</p>
                <p className="text-sm text-slate-400">Active Users</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-rose-400">50K+</p>
                <p className="text-sm text-slate-400">Matches Made</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-rose-400">4.8★</p>
                <p className="text-sm text-slate-400">Avg Rating</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              <motion.div
                className="absolute inset-0 rounded-4xl bg-linear-to-r from-rose-500 to-rose-600 opacity-20 blur-3xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 rounded-4xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center">
                <motion.div
                  className="rounded-3xl border border-rose-500/20 bg-slate-950/80 p-8 shadow-2xl shadow-rose-500/10"
                  animate={{ rotate: [0, 2, 0, -2, 0], y: [0, -10, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="w-32 h-32 text-rose-400/90 opacity-95 fill-rose-500/20" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="container-app py-20 border-t border-slate-800/50 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Powered by AI</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience intelligent features designed to help you find meaningful love.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href ?? destinationRoute}
              className="group card transition hover:-translate-y-1"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className="cursor-pointer"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mt-4 group-hover:text-rose-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2">{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-app py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-linear-to-r from-rose-500/10 to-rose-600/10 border border-rose-500/20 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Find Love?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join thousands of people finding meaningful connections on LoveGram.
          </p>
          <Link href={ROUTES.AUTH.SIGN_UP}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="btn-primary">Get Started Today</Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-slate-800/50 mt-20 py-12 relative z-10">
        <div className="container-app text-center text-slate-400 text-sm">
          <p>&copy; 2026 LoveGram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
