import express from "express";
import { getUsers, login, signup } from "../controllers/users-controller.js";
import { check } from "express-validator";
import { upload } from "../middleware/file-upload.js";

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  upload.single("image"),
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
