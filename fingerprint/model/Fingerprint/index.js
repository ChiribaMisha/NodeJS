const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.addUser = function (counter, host, connection, referer) {
  const userInfo = new this({
    counter,
    host,
    connection,
    referer
  });
  return userInfo;
};


const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;