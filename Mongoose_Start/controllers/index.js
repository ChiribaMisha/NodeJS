const Users = require('../model/Users');
const mongoose = require('mongoose');



const addNewUser = (req, res) => {
  const newUser = new Users({
    name: 'Федор',
    exp: 33,
    role: 'engineer',
    salary: 50000,
    stage: 1,
    transpotation: false,
  });

  newUser.save((err, newUser) => {
    if (err) throw err;
    res.sendStatus('200');
  });
};

const showUserById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.json({ message: 'id not correct' });
  } else {
    try {
      const user = await Users.findById(id);
      if (!user) {
        res.json({ message: `user not found` });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.json({ message: `id ${err.value} not found` });
    }
  }
}


module.exports = {
  addNewUser,
  showUserById,
};