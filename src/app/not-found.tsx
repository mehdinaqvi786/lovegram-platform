import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center shadow-2xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Page not found</p>
        <h1 className="mt-6 text-5xl font-semibold text-white">We couldn’t find that page.</h1>
        <p className="mt-4 text-slate-400">
          The LoveGram page you were looking for may have moved or no longer exists.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-4 text-base font-semibold text-white transition hover:opacity-90">
          Return home
        </Link>
      </div>
    </main>
  )
}
