const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  title: {
    type: String,
    maxLength: 2,
  },
  article: {
    type: String,
    maxLength: 2,
  },
  tags: [],
  date: {
    type: Date,
  },
}, { timestamps: true });