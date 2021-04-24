const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }
}, { timestamps: true });