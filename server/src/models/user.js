import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  name: { type: String, requried: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  image: { type: String, requried: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

UserSchema.plugin(uniqueValidator);

export const UserModel = mongoose.model("User", UserSchema);
