const Users = require('../model/Users');
const mongoose = require('mongoose');


const renderRegister = (req, res) => {
  res.render('register');
};

const createNewUser = async (req, res) => {
  const { email, password, name } = req.body;
  await Users.createNewUser(email, password, name);
  res.sendStatus(200);
};
module.exports = {
  renderRegister,
  createNewUser,
};