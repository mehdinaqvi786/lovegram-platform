// Application Constants
export const APP_NAME = 'LoveGram'
export const APP_DESCRIPTION = 'The most beautiful, emotional, interactive, AI-powered relationship platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_UP: '/auth/sign-up',
    LOG_IN: '/auth/log-in',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    PROFILE: '/dashboard/profile',
    MATCHES: '/dashboard/matches',
    MESSAGES: '/dashboard/messages',
    SETTINGS: '/dashboard/settings',
  },
  FEATURES: {
    COMPATIBILITY: '/features/compatibility',
    ICEBREAKER: '/features/icebreaker',
    PASSPORT: '/features/passport',
    TIMELINE: '/features/timeline',
    GOALS: '/features/goals',
    SECRET_CRUSH: '/features/secret-crush',
    MOOD: '/features/mood',
    COMPLIMENTS: '/features/compliments',
    VOICE: '/features/voice',
    MUSIC: '/features/music',
    MOVIES: '/features/movies',
    QUIZ: '/features/quiz',
    DATES: '/features/dates',
    LETTER: '/features/letter',
    CAPSULE: '/features/capsule',
    REVIEW: '/features/review',
    FLAGS: '/features/flags',
    COACH: '/features/coach',
    TIPS: '/features/tips',
    QUOTE: '/features/quote',
    RADAR: '/features/radar',
    NEARBY: '/features/nearby',
    LEADERBOARD: '/features/leaderboard',
    COMMUNITY: '/features/community',
    CONFESSIONS: '/features/confessions',
    CHAT: '/features/chat',
    VIDEO: '/features/video',
    AUDIO: '/features/audio',
  },
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    REPORTS: '/admin/reports',
    ANALYTICS: '/admin/analytics',
    SUBSCRIPTIONS: '/admin/subscriptions',
  },
}

// Genders
export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'other', label: 'Other' },
]

// Relationship Statuses
export const RELATIONSHIP_STATUSES = [
  { value: 'single', label: 'Single' },
  { value: 'dating', label: 'Dating' },
  { value: 'married', label: 'Married' },
  { value: 'complicated', label: 'It\'s Complicated' },
]

// Love Languages
export const LOVE_LANGUAGES = [
  { value: 'words-of-affirmation', label: 'Words of Affirmation' },
  { value: 'acts-of-service', label: 'Acts of Service' },
  { value: 'receiving-gifts', label: 'Receiving Gifts' },
  { value: 'quality-time', label: 'Quality Time' },
  { value: 'physical-touch', label: 'Physical Touch' },
]

// Lifestyle Options
export const LIFESTYLES = [
  { value: 'very-active', label: 'Very Active' },
  { value: 'somewhat-active', label: 'Somewhat Active' },
  { value: 'not-very-active', label: 'Not Very Active' },
]

// Personality Types (16 Personalities)
export const PERSONALITY_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

// Interests (Sample)
export const INTERESTS = [
  'Travel', 'Cooking', 'Fitness', 'Reading', 'Movies',
  'Music', 'Art', 'Technology', 'Sports', 'Gaming',
  'Photography', 'Fashion', 'Yoga', 'Dancing', 'Hiking',
  'Painting', 'Writing', 'Outdoor Activities', 'Volunteering', 'Mental Health',
]

// Hobbies (Sample)
export const HOBBIES = [
  'Watching Movies', 'Reading Books', 'Gaming', 'Drawing', 'Singing',
  'Playing Instruments', 'Cooking', 'Gardening', 'Photography', 'Journaling',
  'Meditation', 'Yoga', 'Running', 'Swimming', 'Cycling',
  'Hiking', 'Rock Climbing', 'Skateboarding', 'Surfing', 'Traveling',
]

// Moods
export const MOODS = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'excited', label: 'Excited', emoji: '🤩' },
  { value: 'romantic', label: 'Romantic', emoji: '😍' },
  { value: 'busy', label: 'Busy', emoji: '😤' },
  { value: 'sleeping', label: 'Sleeping', emoji: '😴' },
  { value: 'working', label: 'Working', emoji: '💼' },
]

// Achievements
export const ACHIEVEMENTS = [
  { id: 'hopeless-romantic', label: 'Hopeless Romantic', icon: '💕' },
  { id: 'first-match', label: 'First Match', icon: '💘' },
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'verified', label: 'Verified', icon: '✅' },
  { id: 'explorer', label: 'Explorer', icon: '🌍' },
  { id: 'conversation-master', label: 'Conversation Master', icon: '💬' },
]

// Date Ideas (Sample)
export const DATE_IDEAS = {
  restaurants: [
    'Italian Restaurant', 'Japanese Restaurant', 'French Bistro', 'Thai Restaurant',
    'Indian Restaurant', 'Mexican Restaurant', 'Korean BBQ', 'Steakhouse',
  ],
  movies: [
    'Romantic Comedy', 'Drama', 'Action', 'Thriller', 'Animation', 'Documentary',
  ],
  activities: [
    'Picnic', 'Movie Night', 'Cooking Class', 'Wine Tasting', 'Hiking', 'Beach Day',
    'Museum Visit', 'Concert', 'Theater Show', 'Stargazing',
  ],
}

// Letter Types
export const LETTER_TYPES = [
  { value: 'cute', label: 'Cute' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'funny', label: 'Funny' },
  { value: 'poetic', label: 'Poetic' },
]

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The resource you are looking for was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  EMAIL_EXISTS: 'This email is already in use.',
  INVALID_PASSWORD: 'Password must be at least 8 characters.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  PASSWORD_CHANGED: 'Your password has been changed successfully.',
  EMAIL_VERIFIED: 'Your email has been verified successfully.',
  ACCOUNT_CREATED: 'Your account has been created successfully.',
}

export const API_TIMEOUT = 30000 // 30 seconds
