'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Heart, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span className="text-2xl font-bold gradient-text">LoveGram</span>
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href={ROUTES.DASHBOARD.HOME}>
                <Button variant="secondary">Dashboard</Button>
              </Link>
            </>
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
      </nav>

      {/* Hero Section */}
      <section className="container-app py-20 md:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5">
              <p className="text-sm text-rose-300">✨ The Future of Love</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find <span className="gradient-text">Your Perfect Match</span> With AI
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed">
              LoveGram is the most beautiful, emotional, and interactive AI-powered relationship platform. 
              Discover meaningful connections with advanced compatibility matching and relationship insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={ROUTES.AUTH.SIGN_UP}>
                <Button className="btn-primary w-full sm:w-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Exploring
                </Button>
              </Link>
              <Button variant="secondary" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/50">
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
            </div>
          </div>

          {/* Right Visual - Placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl border border-slate-700/50 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-32 h-32 text-rose-500 opacity-30 fill-rose-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container-app py-20 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powered by AI</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience intelligent features designed to help you find meaningful love
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-8 h-8 text-rose-500" />,
              title: 'AI Compatibility Score',
              description: 'Get instant compatibility analysis with detailed insights'
            },
            {
              icon: <Sparkles className="w-8 h-8 text-rose-500" />,
              title: 'Daily Icebreakers',
              description: 'Receive 5 unique conversation starters every day'
            },
            {
              icon: <Heart className="w-8 h-8 text-rose-500" />,
              title: 'Love Passport',
              description: 'Track your relationship journey and shared dreams'
            }
          ].map((feature, index) => (
            <div key={index} className="card group">
              {feature.icon}
              <h3 className="text-lg font-semibold mt-4 group-hover:text-rose-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-app py-20 text-center">
        <div className="bg-gradient-to-r from-rose-500/10 to-rose-600/10 border border-rose-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Love?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join thousands of people finding meaningful connections on LoveGram.
          </p>
          <Link href={ROUTES.AUTH.SIGN_UP}>
            <Button className="btn-primary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-20 py-12">
        <div className="container-app text-center text-slate-400 text-sm">
          <p>&copy; 2026 LoveGram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
