const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title!'],
    unique: true,
  },
  rating: Number,
  author: {
    type: String,
    required: [true, 'An article must have an author!'],
  },
  text: {
    type: String,
    required: [true, 'An article must have a text'],
  },
});

module.exports = mongoose.model('Article', articleSchema);
