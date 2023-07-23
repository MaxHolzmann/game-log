// models/position.js
import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // The ID of the position
  content: { type: String, required: true }, // The content of the position
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

const Position = mongoose.model("Position", positionSchema);

export default Position;
