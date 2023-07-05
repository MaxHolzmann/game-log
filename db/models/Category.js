// category for users games
 // this may be implemented later for custom Categories
 // for now we will just have default category options.
 // defaults: Playing, Backlog, Completed.
const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;