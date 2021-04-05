var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', controllers.renderIndex);
router.post('/add', upload.none(), controllers.addNewArticle);

module.exports = router;
