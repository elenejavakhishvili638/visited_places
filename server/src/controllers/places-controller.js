import HttpError from "../models/http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

let DUMMY_PLACES = [
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

export const getPlaceById = async (req, res, next) => {
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
};

export const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  const places = DUMMY_PLACES.filter((place) => place.userId === userId);
  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find a place for the provided ID.",
      404
    );
    return next(error);
  }
  res.json({ places });
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((error) => error.msg);
    return next(new HttpError(errorMsgs.join(". "), 422));
  }

  const { name, description, coordinates, address, userId } = req.body;
  const createdPlace = {
    id: uuidv4(),
    name,
    description,
    location: coordinates,
    address,
    userId,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((error) => error.msg);
    return next(new HttpError(errorMsgs.join(". "), 422));
  }

  const placeId = req.params.placeId;
  const { name, description } = req.body;

  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);

  updatedPlace.name = name;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  DUMMY_PLACES.filter((place) => place.id === placeId);

  res.status(200).json({ message: "Deleted place" });
};
