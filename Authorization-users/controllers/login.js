const Users = require('../model/Users');
const mongoose = require('mongoose');


const renderLogin = (req, res) => {
  res.render('login');
};

const authUserByEmail = async (req, res) => {
  const { email, password } = req.body;

  const userFromDB = await Users.findUserByEmail(email);

  if (userFromDB === null) {
    res.send({ Error: true, info: 'User not found' });
    return;
  };

  const frontObj = new Users({ password });
  const checkUser = await frontObj.authUser(userFromDB);

  (checkUser === true) ? res.send({ status: 'OK', userName: userFromDB.name }) : res.send({ Error: true, info: 'Password not correct' });
};

module.exports = {
  renderLogin,
  authUserByEmail
};