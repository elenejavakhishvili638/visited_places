import HttpError from "../models/http-error.js";
import jwt from "jsonwebtoken";

export const checkAuth = (res, req, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authrntication failed!");
    }
    const decodedToken = jwt.verify(token, "secret");
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
};
