const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');
const { createHash } = require('crypto');

generalSchema.virtual('password')
  .get(function () {
    return 'no data';
  })
  .set(function (passw) {
    const hash = createHash('sha256');
    hash.update(passw);
    this.passwordHash = hash.digest('hex');
  });

generalSchema.statics.createNewUser = function (email, password, name) {
  const newUser = new this({
    email,
    password,
    name
  });

  newUser.save(function (err) {
    if (err) return console.log(err);
  });
};

generalSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({ email });
  return user;
};

generalSchema.methods.authUser = async function (dbData) {
  if (this.passwordHash === dbData.passwordHash) {
    return true;
  } else {
    return false;
  }
}







// generalSchema.statics.checkUser = async function (email, password) {
//   const user = await this.find({ email: `${email}` }, function (err, docs) {
//     if (err) console.log(err);
//   });

//   if (user.length === 0) return { Error: true, ErrorInfo: 'User not Found' };
//   const hash = createHash('sha256');
//   hash.update(password);
//   console.log(this.password);
//   if (user[0].password === hash.digest('hex')) {
//     return { Error: false, name: user[0].name };
//   } else {
//     return { Error: true, ErrorInfo: 'Password not correct' };
//   }
// }



const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;