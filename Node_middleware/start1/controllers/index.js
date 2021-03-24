const indexRender = async (req, res) => {
  res.render('index');
}

const sendData = async (req, res) => {
  res.send(`${req.body.inp}`)
}

module.exports = {
  indexRender,
  sendData,
};
