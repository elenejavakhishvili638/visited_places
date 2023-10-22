import express from "express";
import { placeRouter } from "./routes/places-routes.js";
import HttpError from "./models/http-error.js";
import { userRouter } from "./routes/users-routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://javakhishvilielene3:${process.env.MONGO_DB_PASSWORD}@visitedplaces.cbb3fxf.mongodb.net/visitedplaces?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => console.log("server"));
  })
  .catch((error) => {
    console.log(error);
  });
