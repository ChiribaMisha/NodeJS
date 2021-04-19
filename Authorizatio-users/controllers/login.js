const Users = require('../model/Users');
const mongoose = require('mongoose');


const renderIndex = (req, res) => {
  res.render('login');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.checkUser(email, password);

  if (user.Error === false) res.send({ status: 'OK', userName: user.name });
  if (user.Error === true) res.send({ Error: true, info: user.ErrorInfo });

};

const renderUser = (req, res) => {
  res.render('user', { name: req.params.name });
};

module.exports = {
  renderIndex,
  login,
  renderUser,
};