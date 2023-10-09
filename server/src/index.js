import express from "express";
import { placeRouter } from "./routes/places-routes.js";

const app = express();
app.use(express.json());
app.use("/api/places", placeRouter);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000, () => console.log("server"));
