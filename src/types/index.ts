// User Types
export interface User {
  id: string
  clerkId: string
  email: string
  name: string
  avatar?: string
  coverImage?: string
  bio?: string
  location?: string
  age?: number
  gender?: 'male' | 'female' | 'non-binary' | 'other'
  relationshipStatus?: string
  languages?: string[]
  interests?: string[]
  hobbies?: string[]
  education?: string
  profession?: string
  favoriteArtists?: string[]
  favoriteMovies?: string[]
  favoriteBooks?: string[]
  pets?: string[]
  travelPlaces?: string[]
  dreamDestination?: string
  personalityType?: string
  loveLanguage?: string
  lifestyle?: string
  height?: string
  religion?: string
  verified?: boolean
  createdAt: Date
  updatedAt: Date
}

// Profile Types
export interface ProfilePhoto {
  id: string
  userId: string
  url: string
  order: number
  isPrimary: boolean
  createdAt: Date
}

// Match Types
export interface Match {
  id: string
  userId: string
  matchedUserId: string
  status: 'pending' | 'matched' | 'rejected'
  createdAt: Date
}

// Message Types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  isRead: boolean
  createdAt: Date
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form Types
export interface SignUpFormData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export interface LogInFormData {
  email: string
  password: string
}

export interface ProfileFormData {
  name: string
  bio: string
  age: number
  gender: string
  location: string
  interests: string[]
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
