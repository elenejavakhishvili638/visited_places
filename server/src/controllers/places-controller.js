import HttpError from "../models/http-error.js";
import { v4 as uuidv4 } from "uuid";

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

export const getPlaceByUserId = async (req, res, next) => {
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
};

export const createPlace = async (req, res, next) => {
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
