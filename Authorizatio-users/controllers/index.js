const Users = require('../model/Users');
const mongoose = require('mongoose');


const renderIndex = (req, res) => {
  res.render('index');
};

const registration = (req, res) => {
  const { email, password, name } = req.body;

  const newUser = new Users({
    email,
    name
  });

  newUser.passwordHash = password;

  newUser.save(function (err) {
    if (err) return console.log(err);
    res.sendStatus(200);
  });
};

const renderUser = (req, res) => {
  res.render('user', { name: req.params.name });
};

module.exports = {
  renderIndex,
  registration,
  renderUser,
};