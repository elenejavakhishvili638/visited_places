import express from "express";
import {
  createPlace,
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller.js";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlaceByUserId);

router.post("/", createPlace);

export { router as placeRouter };
