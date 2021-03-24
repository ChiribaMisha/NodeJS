const express = require('express');
const controllers = require('../controllers');
const router = express.Router();
const multer = require('multer');
const upload = multer();


const inputValidation = (req, res, next) => {
  if (req.body.inp.length > 10) {
    req.body.inp = 'error data';
  } else {
    if (req.body.inp.match(/^[a-zA-Z0-9]+$/g) == null) {
      req.body.inp = 'error data';
    } else {
      req.body.inp = 'value accepted';
    };
  };
  next();
}

router.get('/', controllers.indexRender);

router.post('/form', upload.none(), inputValidation, controllers.sendData)

module.exports = router;





