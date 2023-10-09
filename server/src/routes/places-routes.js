import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller.js";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlaceByUserId);

export { router as placeRouter };
