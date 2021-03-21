const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

router.get('/', controllers.getCarsStoreSales);

module.exports = router;





