const Fingerprint = require('../model/Fingerprint');

const renderIndex = (req, res) => {
  res.render('index');
};

const getUsers = async (req, res) => {
  const user = await Fingerprint.findOne({ connection: req.header('user-agent') });

  if (!user) {
    let counter = 1;
    const newUser = await Fingerprint.addUser(counter, req.header('host'), req.header('user-agent'), req.header('referer'));
    newUser.save();
    res.send('зравствуйте');
  } else {
    user.counter += 1;
    await Fingerprint.findOneAndUpdate({ _id: user._id }, { counter: user.counter });
    res.send('добро пожаловать снова');
  };
};

const getAllUser = async (req, res) => {
  const allUsers = await Fingerprint.find({});
  res.render('api', { users: allUsers });
};

module.exports = {
  renderIndex,
  getUsers,
  getAllUser,
};