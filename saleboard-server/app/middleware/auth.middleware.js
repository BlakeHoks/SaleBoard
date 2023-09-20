import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userFields } from '../utils/user.utils.js'
import { confirmToken } from '../auth/token.js'

export const authCheck = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    const decoded = confirmToken(token)
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: userFields,
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(400)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
