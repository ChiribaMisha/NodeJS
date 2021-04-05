const Article = require('../model/Article');
const mongoose = require('mongoose');
const moment = require('moment');

const renderIndex = (req, res) => {
  Article.find({}, function (err, docs) {
    if (err) return err;

    const viewDate = docs.map(el => {
      return moment(el.date).format('DD-MM-YYYY');
    });

    const authorArr = docs.map(el => {
      return el.author;
    });

    const uniqAuthorArr = Array.from(new Set(authorArr));

    res.render('index', { articles: docs, viewDate: viewDate, author: uniqAuthorArr });
  });
};

const addNewArticle = (req, res) => {
  const tagsArr = req.body.tags.split(',');

  const tagsArrWithoutSpaces = tagsArr.map(el => {
    return el.trim();
  });

  const newArticle = new Article({
    title: `${req.body.title}`,
    article: `${req.body.article}`,
    tags: tagsArrWithoutSpaces,
    date: `${req.body.date}`,
    author: `${req.body.author}`
  });

  const view = () => {
    Article.find({}, function (err, docs) {
      if (err) {
        res.send(err.message);
      } else {
        res.send(docs);
      };
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
