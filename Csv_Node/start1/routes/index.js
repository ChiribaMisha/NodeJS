const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.none(), (req, res) => {

  const csvWriter = createCsvWriter({
    path: './csv/1.csv',
    header: [
      { id: 'author', title: 'Author' },
      { id: 'date', title: 'Date' },
      { id: 'text', title: 'Text' }
    ]
  });

  const records = [
    { author: req.body.author, date: req.body.date, text: req.body.textarea },
  ];

  csvWriter.writeRecords(records)
    .then(() => {
      console.log('...Done');
    });



  res.send('form send');
});

module.exports = router;





