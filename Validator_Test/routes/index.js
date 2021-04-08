var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const multer = require('multer');
const upload = multer();
const validator = require('./validator');

router.get('/', controllers.renderIndex);
router.post('/add', upload.none(), validator.validation, controllers.sendOk);

module.exports = router;
