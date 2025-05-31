import jwt from 'jsonwebtoken'

// Define the payload structure of the JWT
type JwtPayload = {
    userId: number
}

// This function creates a JWT with the user's ID and 1 hour expiry
export const generateToken = (user: { id: number }) => {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
    }
    console.log('Generating token for user id:', user.id)

    return jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' })
}

// This function checks if the token is valid and returns the data
export const verifyToken = (token: string): JwtPayload | null => {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
    }

    try {
        const decoded = jwt.verify(token, secret)
        console.log('Decoded JWT:', decoded)
        return decoded as JwtPayload
    } catch (error) {
        //console.error('JWT verification error:', error)
        return null
    }
}