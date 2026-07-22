import jwt from 'jsonwebtoken'

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Missing JWT_SECRET in environment variables')
  }
  return secret
}

export interface SessionTokenPayload {
  userId: string
}

export function signToken(payload: SessionTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as SessionTokenPayload
}
