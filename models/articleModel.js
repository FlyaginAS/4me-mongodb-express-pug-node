const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title!'],
    unique: true,
  },
  section: {
    type: String,
    required: [true, 'An article must have a section'],
  },
  subSection: {
    type: String,
    required: [true, 'An article must have a subSection'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: [true, 'An article must have an author!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  url: {
    type: String,
    required: [true, 'An article must have a text'],
  },
});

module.exports = mongoose.model('Article', articleSchema);
