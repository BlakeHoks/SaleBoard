import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { hash, verify } from "argon2";
import { generateToken } from "./generate-token.js";
import { userFields } from "../utils/user.utils.js";

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const isValidPassword = await verify(user.password, password);

  if (user && isValidPassword) {
    const token = generateToken(user.id);
    res.json({ user, token });
  } else {
    res.status(401);
    throw new Error("Email or password is not correct");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, number, password } = req.body;

  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      number,
      password: await hash(password),
    },
    select: userFields,
  });

  const token = generateToken(user.id);

  res.json({ user, token });
});

export const addProfileImage = asyncHandler(async (req, res) => {
  console.log(123);
});
