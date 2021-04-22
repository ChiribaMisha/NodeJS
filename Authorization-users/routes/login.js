const express = require('express');
const router = express.Router();
const controllers = require('../controllers/login')
const multer = require('multer');
const upload = multer();
const validator = require('./validator');

router.get('/', controllers.renderLogin);
router.post('/login', upload.none(), validator.validation, controllers.authUserByEmail);

module.exports = router;