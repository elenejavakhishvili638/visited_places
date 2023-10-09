import express from "express";
import { getUsers, login, signup } from "../controllers/users-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty().withMessage("Name cannot be empty"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email should be a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signup
);

router.post("/login", login);

export { router as userRouter };
