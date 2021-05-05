const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  counter: {
    type: Number,
  },
  host: {
    type: String,
  },
  connection: {
    type: String,
  },
  referer: {
    type: String,
  }
}, { timestamps: true });