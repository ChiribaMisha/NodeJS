const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');
const multer = require('multer');
const upload = multer();

router.get('/', controllers.renderIndex);

module.exports = router;
