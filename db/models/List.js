// model for users games, game category, etc.
const mongoose = require("mongoose");

// Define the Game schema
const gameSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.Mixed,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// Create the Game model
const List = mongoose.models.List || mongoose.model("List", gameSchema);

module.exports = List;
