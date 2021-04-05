const Article = require('../model/Article');
const mongoose = require('mongoose');
const moment = require('moment');

const renderSearch = (req, res) => {
  Article.find({}, function (err, docs) {
    if (err) return console.log(err);

    const tagsArr = docs.reduce((result, item) => {
      return item.tags.reduce((result1, item1) => {
        result.push(item1.trim());
        return result;
      }, []);
    }, []);

    const uniqTagsArr = Array.from(new Set(tagsArr));
    res.render('search', { articles: docs, tags: uniqTagsArr });
  });
};

const searchArticleByYears = (req, res) => {
  const { from, to } = req.body;
  console.log('from:', from, 'to:', to);
  Article.find({}, function (err, docs) {
    if (err) return console.log(err);

    const resultArr = docs.filter(el => {
      if (moment(el.date).format('YYYY-MM-DD') > from && to > moment(el.date).format('YYYY-MM-DD')) {
        return el;
      };
    });

    res.send(resultArr);
  });
};

const searchArticleByTags = (req, res) => {
  const { from, to, tags } = req.body;

  Article.find({}, function (err, docs) {
    if (err) return console.log(err);

    const resultArr = docs.reduce((results, Obj) => {
      if (Array.isArray(tags) === true) {
        return tags.reduce((result, tagsStr) => {
          return Obj.tags.reduce((result1, tagsStr1) => {
            if (tagsStr1 === tagsStr) results.push(Obj);
            return results;
          }, []);
        }, []);
      } else {
        return Obj.tags.reduce((result1, item1) => {
          if (item1 === tags) results.push(Obj);
          return results;
        }, []);
      };
    }, []);

    const uniqResultArr = Array.from(new Set(resultArr));

    res.send(uniqResultArr);
  });
};

module.exports = {
  renderSearch,
  searchArticleByYears,
  searchArticleByTags,
};
