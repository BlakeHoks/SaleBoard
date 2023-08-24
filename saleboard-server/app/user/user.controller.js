import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { userFields } from "../utils/user.utils.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: userFields,
  });

  res.json(user);
});

export const addProfileImage = asyncHandler(async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: +req.user.id,
    },
    data: {
      image: req.file.filename,
    },
  });

  res.json(user);
});
