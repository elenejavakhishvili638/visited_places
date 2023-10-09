import express from "express";
import HttpError from "../models/http-error.js";

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    name: "home",
    description: "oneksdbkjsc",
    image: "dnksjdkjb",
    address: "djksd",
    coordinates: {
      lat: 48.8584,
      lng: 2.2945,
    },
    userId: "u1",
  },
  {
    id: "p2",
    name: "homes",
    description: "oneksdbkjsc",
    image: "dnksjdkjb",
    address: "djksd",
    coordinates: {
      lat: 48.8584,
      lng: 2.2945,
    },
    userId: "u2",
  },
];

router.get("/:placeId", async (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided ID.",
      404
    );
    return next(error);
  }
  res.json({ place });
});

router.get("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find((place) => place.userId === userId);
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided ID.",
      404
    );
    return next(error);
  }
  res.json({ place });
});

export { router as placeRouter };
