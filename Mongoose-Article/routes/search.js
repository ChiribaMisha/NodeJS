var express = require('express');
var router = express.Router();
const controllers = require('../controllers/search')
const multer = require('multer');
const upload = multer();

router.get('/', controllers.renderSearch);
router.post('/year', upload.none(), controllers.searchArticleByYears);
router.post('/tag', upload.none(), controllers.searchArticleByTags);

module.exports = router;