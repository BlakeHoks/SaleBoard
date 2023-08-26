import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const createAd = asyncHandler(async (req, res) => {
  const { title, description, authorId, address, categoryName, price } =
    req.body;
  const images = [];
  for (let i = 0; i < req.files.length; i++) {
    images.push(req.files[i].filename);
  }

  const ad = await prisma.ad.create({
    data: {
      title,
      description,
      images,
      authorId: +authorId,
      address,
      categoryName,
      status: "created",
      price: +price,
    },
  });
  res.json(ad);
});

export const getAdById = asyncHandler(async (req, res) => {
  const ad = await prisma.ad.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      author: true,
    },
  });

  res.json(ad);
});

export const getAdByAuthorId = asyncHandler(async (req, res) => {
  const ad = await prisma.ad.findMany({
    where: {
      authorId: +req.params.id,
    },
  });

  res.json(ad);
});

export const getAdByCategory = asyncHandler(async (req, res) => {
  const ads = await prisma.ad.findMany({
    skip: (req.params.page - 1) * 3,
    take: 3,
    where: {
      categoryName: req.params.category_name,
    },
    include: {
      author: true,
    },
  });
  const amount = await prisma.ad.count({
    where: {
      categoryName: req.params.category_name,
    },
  });

  console.log(ads);
  res.json({ ads, amount });
});

export const updateAd = asyncHandler(async (req, res) => {
  const { title, description, images, authorId, address, categoryName, price } =
    req.body;
  const ad = await prisma.ad.update({
    where: {
      id: +req.params.id,
    },
    data: {
      title,
      description,
      images,
      authorId,
      address,
      categoryName,
      price,
    },
  });

  res.json(ad);
});

export const updateAdStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const ad = await prisma.ad.update({
    where: {
      id: +req.params.id,
    },
    data: {
      status,
    },
  });

  res.json(ad);
});

export const deleteAd = asyncHandler(async (req, res) => {
  const ad = await prisma.ad.delete({
    where: {
      id: +req.params.id,
    },
  });
});

export const getAds = asyncHandler(async (req, res) => {
  const ads = await prisma.ad.findMany({
    skip: (req.params.page - 1) * 10,
    take: 10,
    where: {
      OR: [
        {
          title: {
            search: req.query,
            mode: "insensitive",
          },
        },
        {
          description: {
            search: req.query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const amount = await prisma.ad.count({
    where: {
      OR: [
        {
          title: {
            search: req.query,
            mode: "insensitive",
          },
        },
        {
          description: {
            search: req.query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.json({ ads, amount });
});
