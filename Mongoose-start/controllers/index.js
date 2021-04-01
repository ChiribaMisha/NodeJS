const Article = require('../model/Article');
const mongoose = require('mongoose');

const renderIndex = (req, res) => {
  Article.find({}, function (err, docs) {
    if (err) return console.log(err);
    res.render('index', { articles: docs });
  });
};

const addNewArticle = (req, res) => {
  const tagsArr = req.body.tags.split(',');

  const newArticle = new Article({
    title: `${req.body.title}`,
    article: `${req.body.article}`,
    tags: tagsArr,
    date: `${req.body.date}`
  });

  const view = () => {
    Article.find({}, function (err, docs) {
      if (err) {
        res.send(err.message)
      } else {
        res.send(docs);
      }
    });
  };

  newArticle.save((err, Article) => {
    if (err) {
      res.send(Object.keys(err.errors)[0])
    } else {
      view();
    };
  });
};

module.exports = {
  renderIndex,
  addNewArticle,
};
