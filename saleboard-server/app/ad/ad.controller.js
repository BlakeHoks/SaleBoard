import asyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";

export const createAd = asyncHandler(async (req, res) => {
    const {title, description, images, authorId, address, categoryName, price} = req.body

    const ad = await prisma.ad.create({
        data: {
            title, description, images, authorId, address, categoryName, status: "created", price
        }
    })

    res.json(ad)
})

export const getAdById = asyncHandler(async (req, res) => {
    const ad = await prisma.ad.findUnique({
        where: {
            id: +req.params.id
        }
    })

    res.json(ad)
})

export const getAdByAuthorId = asyncHandler(async (req, res) => {
    const ad = await prisma.ad.findMany({
        where: {
            authorId: +req.params.id
        }
    })

    res.json(ad)
})

export const getAdByCategory = asyncHandler(async (req, res) => {
    const ad = await prisma.ad.findMany({
        where: {
            categoryName: req.params.category_name
        }
    })

    res.json(ad)
})

export const updateAd = asyncHandler(async (req, res) => {
    const {title, description, images, authorId, address, categoryName, price} = req.body
    const ad = await prisma.ad.update({
        where: {
            id: +req.params.id
        },
        data: {
            title, description, images, authorId, address, categoryName, price
        }
    })

    res.json(ad)
})

export const updateAdStatus = asyncHandler(async (req, res) => {
    const {status} = req.body
    const ad = await prisma.ad.update({
        where: {
            id: +req.params.id
        },
        data: {
            status
        }
    })

    res.json(ad)
})

export const deleteAd = asyncHandler(async (req, res) => {
    const ad = await prisma.ad.delete({
        where: {
            id: +req.params.id
        }
    })
})

export const getAds = asyncHandler(async (req, res) => {
    const ads = await prisma.ad.findMany()

    res.json(ads)
})