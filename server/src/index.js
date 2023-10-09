import express from "express";
import { placeRouter } from "./routes/places-routes.js";

const app = express();
app.use(express.json());
app.use("/api/places", placeRouter);

app.listen(5000, () => console.log("server"));
