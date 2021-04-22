const Users = require('../model/Users');
const mongoose = require('mongoose');


const renderIndex = (req, res) => {
  res.render('index');
};

const renderUser = (req, res) => {
  res.render('user', { name: req.params.name });
};

module.exports = {
  renderIndex,
  renderUser,
};