import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  tshirtColor: { type: String, default: "#D3D3D3", required: true },
});

export const userModel = mongoose.model("users", schema);
