const express = require('express');
const router = express.Router();
const controllers = require('../controllers/login')
const multer = require('multer');
const upload = multer();
const validator = require('./validator');

router.get('/', controllers.renderIndex);
router.get('/welcom:name', controllers.renderUser)
router.post('/login', upload.none(), validator.validation, controllers.login);

module.exports = router;