const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const multer = require('multer');
const upload = multer();
const validator = require('./validator');

router.get('/', controllers.renderIndex);
router.get('/welcom:name', controllers.renderUser)
router.post('/register', upload.none(), validator.validation, controllers.registration);

module.exports = router;
