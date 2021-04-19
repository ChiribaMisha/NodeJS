const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 250,
  },
  surname: {
    type: String,
    maxLength: 250,
  },
  birth: Date,
  exp: Number,
  role: {
    type: String,
    enum: [
      'worker',
      'engineer',
      'chief engineer',
      'welder',
      'fitter',
      'security',
      'accountant',
      'economist',
    ],
  },
  salary: Number,
  stage: Number,
  childs: [{
    name: {
      type: String,
      maxLength: 250,
    },
    age: Number,
  }],
  transportation: Boolean,
}, { timestamps: true });