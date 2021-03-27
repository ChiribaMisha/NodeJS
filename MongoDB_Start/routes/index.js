const express = require('express');
const router = express.Router();
const controllers = require('../controllers')


/* GET home page. */
router.get('/', controllers.render);

module.exports = router;
