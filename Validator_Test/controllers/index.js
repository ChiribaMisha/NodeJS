const renderIndex = (req, res) => {
  res.render('index');
};

const addNewArticle = (req, res) => {
  res.sendStatus(200);
};


module.exports = {
  renderIndex,
  addNewArticle,
};
