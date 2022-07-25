// Libraries and Packages
import express from "express";

//  Middleware
import {
  loginValidate,
  signupValidate,
  postValidate,
} from "../middleware/validation.js";

import { authenticateUser } from "../middleware/authenticateUser.js";

// Controllers
import {
  login,
  signup,
  user,
  updateMode,
  createPost,
  getUsersByName,
  profile,
  follow,
  editProfile,
  updateStore,
} from "../controllers/userController.js";

// Express Routes
const router = express.Router();
const error = 401;

//Routes
router.get("/", authenticateUser, user);

router.post("/login", loginValidate, login);

router.post("/signup", loginValidate, signupValidate, signup);

router.post("/update/store", authenticateUser, updateStore);

router.put("/update/mode", authenticateUser, updateMode);

router.post("/username", authenticateUser, getUsersByName);

router.get("/profile/:id", authenticateUser, profile);

router.put("/profile/", authenticateUser, editProfile);

router.post("/new/post", authenticateUser, postValidate, createPost);

router.post("/follow", authenticateUser, follow);

export default router;
