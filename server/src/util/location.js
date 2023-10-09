import dotenv from "dotenv";
import axios from "axios";
import HttpError from "../models/http-error.js";

dotenv.config();
async function getCoordsForAddress(address) {
  //   return { lat: 99, lng: 88 };
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.MAPS_API_KEY}`
  );

  const data = res.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Could not find location", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

export default getCoordsForAddress;
