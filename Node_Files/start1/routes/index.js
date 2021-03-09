const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const moment = require('moment')
moment().format();

router.get('/', (req, res) => {
  res.render('index');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const writeLog = async (req) => {
  await Promise.all(req.files.map(el => {
    fs.appendFile('./logs/main.log', `${moment().format('DD-MM-YYYY HH:mm')}/${el.originalname}/${el.size}\n`, () => { });
  }));
  fs.appendFile('./logs/main.log', `\n`, () => { })
}

router.post('/', upload.array('file'), (req, res) => {
  writeLog(req);
  res.send('form send');
});

module.exports = router;





