import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import getCoordsForAddress from "../util/location.js";
import { PlaceModel } from "../models/place.js";
import { UserModel } from "../models/user.js";
import mongoose from "mongoose";
import fs from "fs";

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
    image: req.file.path,
    location: coordinates,
    address,
  });

  let user;
  try {
    user = await UserModel.findById(userId);
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id.", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
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
    updatedPlace = await PlaceModel.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not update a place", 500));
  }

  if (updatedPlace.userId.toString() !== req.userData.userId) {
    return next(
      new HttpError("You are not authorized to update this place", 401)
    );
  }

  updatedPlace.name = name;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (error) {
    return next(new HttpError("Could not update a place", 500));
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await PlaceModel.findById(placeId).populate("userId");
  } catch (error) {
    return next(new HttpError("Could not delete a place", 500));
  }

  if (!place) {
    return next(new HttpError("Could not find a place for this id", 404));
  }

  if (place.userId.id !== req.userData.userId) {
    return next(
      new HttpError("You are not authorized to delete this place", 401)
    );
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await PlaceModel.deleteOne({ _id: placeId }, { session: sess });
    place.userId.places.pull(place);
    await place.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Could not delete a place", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Place has been deleted" });
};
