import express from "express";
import { getUsers, login, signup } from "../controllers/users-controller.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signup);

router.post("/login", login);

export { router as userRouter };
