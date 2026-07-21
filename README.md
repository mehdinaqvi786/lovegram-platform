# LoveGram

LoveGram is a premium AI-powered relationship platform built with Next.js, Clerk authentication, Tailwind CSS, and Framer Motion.

## Features

- Animated premium landing page
- Clerk sign-in and sign-up flows
- Protected dashboard with profile, matches, messages, and settings
- Dynamic match and message detail pages
- Dark, modern UI with motion-driven polish

## Available Routes

- `/` - Landing page
- `/auth/log-in` - Sign in
- `/auth/sign-up` - Sign up
- `/dashboard` - Dashboard home
- `/dashboard/profile` - Profile settings
- `/dashboard/matches` - Match browsing
- `/dashboard/messages` - Message overview
- `/dashboard/settings` - App preferences

## Getting Started

Install dependencies and start the development server:

```bash
cd /Users/hur/Desktop/lovergram
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Notes

- Clerk is configured with hash routing for auth.
- The app uses Next.js App Router and a custom dark UI theme.
- Use `NEXT_PUBLIC_APP_URL` in `.env.local` to define the application URL.
