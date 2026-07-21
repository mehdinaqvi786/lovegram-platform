'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap, Heart, Flame, Sparkles } from 'lucide-react'
import { ROUTES } from '@/constants'

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden relative">
      {/* Animated background orbs */}
      <motion.div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl" animate={{ y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-fuchsia-500/15 blur-3xl" animate={{ y: [0, -50, 0] }} transition={{ duration: 14, repeat: Infinity, delay: 1 }} />

      <div className="container-app py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 hover:border-rose-500/50 transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="text-center flex-1">
            <Zap className="w-8 h-8 text-rose-400 mx-auto mb-2" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">Compatibility Score</h1>
            <p className="text-rose-400 text-sm mt-2">Powered by AI</p>
          </div>
          <div className="w-32" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Interactive Score */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Big Score Display */}
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-4xl border border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 p-8 backdrop-blur">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Your Connection</h3>
                <Flame className="w-8 h-8 text-rose-500" />
              </div>
              <motion.div className="h-32 rounded-3xl bg-gradient-to-r from-rose-500 to-fuchsia-500 flex items-center justify-center relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <motion.div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" animate={{ y: [0, -100] }} transition={{ duration: 3, repeat: Infinity }} />
                <div className="relative text-center">
                  <motion.p className="text-7xl font-bold text-white" key="score">87%</motion.p>
                  <p className="text-rose-100">Perfect Match</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'Interests', value: '92%', icon: Heart }, { label: 'Values', value: '85%', icon: Sparkles }, { label: 'Vibe', value: '88%', icon: Flame }, { label: 'Chemistry', value: '79%', icon: Zap }].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} whileHover={{ y: -4 }} className="rounded-3xl border border-rose-500/20 bg-slate-900/80 p-6 hover:border-rose-500/50 transition cursor-pointer">
                  <m.icon className="w-5 h-5 text-rose-400 mb-3" />
                  <p className="text-sm text-slate-400">{m.label}</p>
                  <p className="text-3xl font-bold text-rose-400 mt-1">{m.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-10">
              <h2 className="text-3xl font-bold mb-8">How We Match You</h2>
              <div className="space-y-6">
                {[{ num: '1', title: 'Profile Analysis', desc: 'AI learns your unique personality and values' }, { num: '2', title: 'Smart Matching', desc: 'Finds people who truly get you' }, { num: '3', title: 'Live Insights', desc: 'See why you click with each match' }, { num: '4', title: 'Better Convos', desc: 'Get ideas for meaningful chats' }].map((item, i) => (
                  <motion.div key={item.num} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center font-bold flex-shrink-0">{item.num}</div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} className="rounded-3xl border border-rose-500/30 bg-linear-to-r from-rose-500/10 to-fuchsia-500/10 p-8 text-center cursor-pointer">
              <p className="text-rose-300 text-sm mb-2">✨ Ready to find someone amazing?</p>
              <p className="text-xl font-bold">Start discovering your perfect match</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
