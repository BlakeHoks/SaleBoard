import asyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";

export const createComment = asyncHandler(async (req, res) => {
    const {text, estimate, adId, authorId, userId} = req.body

    const comment = await prisma.comment.create({
        data: {
            text, estimate, adId, authorId, userId
        }
    })

    res.json(comment)
})

export const getCommentsByUser = asyncHandler(async (req, res) => {
    const {userId} = req.body

    const comments = await prisma.comment.findMany({
        where: {
            userId
        }
    })

    res.json(comments)
})

export const getCommentsByAuthor = asyncHandler(async (req, res) => {
    const {authorId} = req.body

    const comments = await prisma.comment.findMany({
        where: {
            authorId
        }
    })

    res.json(comments)
})