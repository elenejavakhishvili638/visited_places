import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import { UserModel } from "../models/user.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find({}, "-password");
  } catch (error) {
    return next(new HttpError("There are no users", 500));
  }
  return res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((error) => error.msg);
    return next(new HttpError(errorMsgs.join(". "), 422));
  }

  const { name, email, password } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await UserModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  if (exisitingUser) {
    return next(
      new HttpError("Could not create an user, email already exists", 422)
    );
  }

  const createdUser = new UserModel({
    name,
    email,
    password,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Creating an user has failed, please try again", 500)
    );
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await UserModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  if (!exisitingUser || exisitingUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  res.json({
    message: "Logged in",
    user: exisitingUser.toObject({ getters: true }),
  });
};
