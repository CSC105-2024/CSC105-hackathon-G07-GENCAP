import type { MiddlewareHandler } from 'hono'
import { verifyToken } from '../utils/token.ts'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]
  
  const payload = verifyToken(token)
  
  if (!payload) {
    return c.json({ message: 'Invalid or expired token' }, 401)
  }

  c.set('userId', payload.userId)
  await next()
}
