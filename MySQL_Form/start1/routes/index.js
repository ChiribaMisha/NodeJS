const express = require('express');
const controllers = require('../controllers');
const router = express.Router();
const multer = require('multer');
const upload = multer();


router.get('/', controllers.getIndexPage);

router.post('/years', upload.none(), controllers.getCarsFromToYears);
router.post('/insert', upload.none(), controllers.insertCar);
router.post('/delete', upload.none(), controllers.deleteCar);

module.exports = router;





