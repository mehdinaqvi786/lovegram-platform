'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Heart, Clock, MapPin } from 'lucide-react'
import { ROUTES } from '@/constants'

const milestones = [
  { icon: Heart, title: 'First Match', desc: 'Sofia - May 15, 2026' },
  { icon: Clock, title: 'First Chat', desc: '3 hours of great conversation' },
  { icon: MapPin, title: 'First Date', desc: 'Coffee by the river - June 1' },
]

export default function PassportPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden relative">
      {/* Animated orbs */}
      <motion.div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-yellow-500/15 blur-3xl" animate={{ y: [0, 40, 0], x: [0, -20, 0] }} transition={{ duration: 11, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" animate={{ y: [0, -60, 0] }} transition={{ duration: 16, repeat: Infinity, delay: 1 }} />

      <div className="container-app py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 hover:border-rose-500/50 transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="text-center flex-1">
            <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">Love Passport</h1>
            <p className="text-amber-400 text-sm mt-2">Your relationship journey</p>
          </div>
          <div className="w-32" />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Timeline */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Your Memory Bank</h2>

            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative"
              >
                {i < milestones.length - 1 && (
                  <motion.div className="absolute left-6 top-16 w-1 h-12 bg-gradient-to-b from-amber-500 to-rose-500/30" />
                )}
                <motion.div whileHover={{ x: 8 }} className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6 cursor-pointer hover:border-amber-500/40 transition">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Passport Card */}
            <motion.div className="rounded-4xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-rose-500/10 p-10 backdrop-blur">
              <div className="text-center mb-8">
                <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Sofia's Profile</h3>
                <p className="text-amber-200 text-sm mt-2">Connected since May 2026</p>
              </div>
              <div className="space-y-4 bg-slate-950/50 rounded-3xl p-6 border border-slate-800/50">
                <div>
                  <p className="text-xs text-amber-300 mb-2">Shared Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {['Travel', 'Art', 'Coffee', 'Music'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-200 border border-amber-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-amber-300 mb-2">My Notes</p>
                  <p className="text-slate-300 text-sm italic">"Loves spontaneous adventures. Dreams of visiting Japan."</p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-10">
              <h3 className="text-2xl font-bold mb-6">Save & Remember</h3>
              <div className="space-y-4">
                {[
                  { title: 'Key Moments', desc: 'First kiss, anniversaries, meaningful dates' },
                  { title: 'Preferences', desc: 'What they love, pet peeves, dreams' },
                  { title: 'Inside Jokes', desc: 'Your unique moments together' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex gap-4">
                    <Heart className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} className="rounded-3xl border border-amber-500/30 bg-linear-to-r from-amber-500/10 to-rose-500/10 p-8 text-center cursor-pointer">
              <p className="text-amber-300 text-sm mb-2">📖 Build your love story</p>
              <p className="text-xl font-bold">Never forget the moments that matter</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
