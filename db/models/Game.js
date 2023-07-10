// model for users games, game category, etc.
const mongoose = require("mongoose");

// Define the Game schema
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create the Game model
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

module.exports = Game;
