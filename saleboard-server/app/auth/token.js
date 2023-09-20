import jwt from 'jsonwebtoken'

export const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })

export const confirmToken = (token) => jwt.verify(token, process.env.JWT_SECRET)
