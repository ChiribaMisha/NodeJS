const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const multer = require('multer');
const upload = multer();

router.get('/', controllers.renderIndex);
router.get('/welcom:name', controllers.renderUser)

module.exports = router;
