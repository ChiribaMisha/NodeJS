const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.addPapers = function (name, text, author, subscriber) {
  const papers = new this({
    name,
    text,
    author,
    subscriber
  });
  return papers;
};


const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;