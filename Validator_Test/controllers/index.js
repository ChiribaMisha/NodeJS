const renderIndex = (req, res) => {
  res.render('index');
};

const sendOk = (req, res) => {
  res.sendStatus(200);
};


module.exports = {
  renderIndex,
  sendOk,
};
