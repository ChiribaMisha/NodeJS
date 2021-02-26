const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const momemt = require('moment');
const fs = require('fs');

fs.mkdir(`./${momemt().format('YYYY-MM-DD')}`, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("New directory successfully created.");
  }
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${momemt().format('YYYY-MM-DD')}`)
  },
  filename: (req, file, cb) => {
    let fileFormat = file.mimetype.split('/');
    cb(null, `${req.body.name}.${fileFormat[fileFormat.length - 1]}`)
  }
})

const upload = multer({ storage: storage });



router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.body.name);
  console.log(req.file);
  res.send('form send');
});

module.exports = router;





