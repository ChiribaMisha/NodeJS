var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('blog', { title: 'Blog' });
});

router.get('/blog/addArticle', function (req, res, next) {
  res.render('addArticle', { title: 'addArticle' });
});

router.get('/blog/editArticle', function (req, res, next) {
  res.render('editArticle', { title: 'editArticle' });
});


module.exports = router;
