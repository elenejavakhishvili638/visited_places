import { v4 as uuidv4 } from "uuid";
import HttpError from "../models/http-error.js";

const USERS = [
  {
    id: "u1",
    name: "elene",
    image:
      "https://media.cntraveler.com/photos/5c2cfc9f6b0c2057eb60d579/16:9/w_1920%2Cc_limit/Edinburgh%2520Castle_GettyImages-157509228.jpg",
    email: "elo@elo",
    password: "123123",
  },
];

export const getUsers = (req, res, next) => {
  return res.json({ users: USERS });
};

export const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = USERS.find((user) => user.email === email);

  if (hasUser) {
    return next(
      new HttpError("Could not crate an user, email already exists", 422)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = USERS.find((user) => user.email === email);

  if (!foundUser || foundUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  res.json({ message: "Logged in" });
};
