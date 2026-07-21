'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Sparkles, Volume2, Zap } from 'lucide-react'
import { ROUTES } from '@/constants'

const icebreakers = [
  { type: 'Playful', emoji: '😄', text: 'What\'s your most embarrassing talent?' },
  { type: 'Deep', emoji: '💭', text: 'What\'s a belief that shaped who you are?' },
  { type: 'Adventurous', emoji: '🌍', text: 'Where would you go if time wasn\'t a factor?' },
  { type: 'Creative', emoji: '🎨', text: 'What\'s your hidden creative passion?' },
]

export default function IcebreakerPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden relative">
      <motion.div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl" animate={{ y: [0, 50, 0], x: [0, -30, 0] }} transition={{ duration: 13, repeat: Infinity }} />
      <motion.div className="absolute top-1/2 -left-20 w-96 h-96 rounded-full bg-rose-500/15 blur-3xl" animate={{ y: [0, -40, 0] }} transition={{ duration: 15, repeat: Infinity, delay: 2 }} />
      <div className="container-app py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 hover:border-rose-500/50 transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="text-center flex-1">
            <MessageCircle className="w-8 h-8 text-fuchsia-400 mx-auto mb-2" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">Daily Icebreakers</h1>
            <p className="text-fuchsia-400 text-sm mt-2">Never run out of things to say</p>
          </div>
          <div className="w-32" />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Sample Conversation Starters</h2>
            {icebreakers.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} whileHover={{ scale: 1.02, x: 8 }} className="rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-6 backdrop-blur hover:border-fuchsia-500/40 transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.emoji}</div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-fuchsia-300 mb-2">{item.type}</p>
                    <p className="text-lg font-semibold group-hover:text-white transition">{item.text}</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-fuchsia-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <motion.div className="rounded-4xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/20 to-rose-500/10 p-8 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-6 h-6 text-fuchsia-400" />
                <h3 className="text-2xl font-bold">Real Connection Magic</h3>
              </div>
              <div className="space-y-4 bg-slate-950/50 rounded-3xl p-6 border border-slate-800/50">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">Try: "What\'s something people always get wrong about you?"</p>
                  </div>
                </div>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl text-center text-slate-500">•••</motion.div>
                <div className="flex gap-3 justify-end">
                  <div className="max-w-xs bg-gradient-to-r from-fuchsia-500 to-rose-500 bg-clip-text text-transparent">They reply with something real</div>
                </div>
              </div>
            </motion.div>
            <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-10">
              <h3 className="text-2xl font-bold mb-6">Why It Works</h3>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, title: 'Personalized', desc: 'Tailored to their interests & vibe' },
                  { icon: Zap, title: 'Impactful', desc: 'Designed for real responses' },
                  { icon: MessageCircle, title: 'Authentic', desc: 'Feel genuine, not robotic' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex gap-4">
                    <item.icon className="w-6 h-6 text-fuchsia-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-3xl border border-fuchsia-500/30 bg-linear-to-r from-fuchsia-500/10 to-rose-500/10 p-8 text-center cursor-pointer">
              <p className="text-fuchsia-300 text-sm mb-2">💬 Ready for better conversations?</p>
              <p className="text-xl font-bold">Get daily prompts that spark real connections</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
