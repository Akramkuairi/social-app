import { check } from "express-validator";

export const loginValidate = [
  check("username")
    .trim()
    .notEmpty()
    .matches(/([0-9a-zA-Z_])/),
  check("password").trim().notEmpty().isLength({ min: 8 }),
];

export const signupValidate = check("repeat_password")
  .trim()
  .notEmpty()
  .isLength({ min: 8 });

export const postValidate = check("post")
  .trim()
  .notEmpty()
  .isLength({ min: 1 });
