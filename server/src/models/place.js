import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export const PlaceModel = mongoose.model("Place", PlaceSchema);
