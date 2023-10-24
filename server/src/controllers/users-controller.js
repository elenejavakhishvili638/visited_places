import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  let hashedPassowrd;
  try {
    hashedPassowrd = await bcrypt.hash(password, 10);
  } catch (error) {
    return next(
      new HttpError("Could not create an user, please try again.", 500)
    );
  }

  const createdUser = new UserModel({
    name,
    email,
    password: hashedPassowrd,
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

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secret",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Creating an user has failed, please try again", 500)
    );
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await UserModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  if (!exisitingUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, exisitingUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  if (!isPasswordValid) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: exisitingUser.id, email: exisitingUser.email },
      "secret",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Creating an user has failed, please try again", 500)
    );
  }

  res.json({
    userId: exisitingUser.id,
    email: exisitingUser.email,
    token,
  });
};
