import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {prisma} from "../prisma.js";
import {userFields} from "../utils/user.utils.js";
import authRoutes from "../auth/auth.routes.js";

export const authCheck = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            select: userFields
        })
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400)
            throw new Error('Not authorized, token failed')
        }
    }
    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})