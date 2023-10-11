import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import getCoordsForAddress from "../util/location.js";
import { PlaceModel } from "../models/place.js";

export const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await PlaceModel.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not find a place", 500));
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided ID.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let places;
  try {
    places = await PlaceModel.find({ userId });
  } catch (error) {
    return next(new HttpError("Could not find a place", 500));
  }
  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find a place for the provided ID.",
      404
    );
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((error) => error.msg);
    return next(new HttpError(errorMsgs.join(". "), 422));
  }

  const { name, description, address, userId } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new PlaceModel({
    name,
    description,
    userId,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oK2ja7ky2VRqw37Oa18BDq6Jp3WAnBO4jJpqgUNefB3n2f_q8sljq3nqdhtxS44OR_8&usqp=CAU",
    location: coordinates,
    address,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    const err = new HttpError(
      "Creating a place has failed, please try again",
      500
    );
    return next(err);
  }

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

  let updatedPlace;
  try {
    updatedPlace = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        name,
        description,
      },
      { new: true }
    );
  } catch (error) {
    return next(new HttpError("Could not update a place", 500));
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    await PlaceModel.findByIdAndDelete(placeId);
  } catch (error) {
    return next(new HttpError("Could not delete a place", 500));
  }

  res.status(200).json({ message: "Place has been deleted" });
};
