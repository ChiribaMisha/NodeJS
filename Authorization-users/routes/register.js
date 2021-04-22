const express = require('express');
const router = express.Router();
const controllers = require('../controllers/register')
const multer = require('multer');
const upload = multer();
const validator = require('./validator');

router.get('/', controllers.renderRegister);
router.post('/register', upload.none(), validator.validation, controllers.createNewUser);

module.exports = router;
