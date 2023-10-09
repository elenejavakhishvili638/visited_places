import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaceByUserId,
  updatePlace,
} from "../controllers/places-controller.js";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:placeId", updatePlace);

router.delete("/:placeId", deletePlace);

export { router as placeRouter };
