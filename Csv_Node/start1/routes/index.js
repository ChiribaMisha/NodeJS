const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.none(), (req, res) => {
  fs.writeFile('./csv/1.csv', `${req.body.author};${req.body.date};${req.body.textarea}\n`, error => {
    if (error) throw error;
    res.send('Сохранено успешно');
  });

  fs.appendFile('./csv/1.csv', `${req.body.author},${req.body.date},${req.body.textarea}`, error => {
    if (error) throw error;
  })
});

router.get('/csv/1.csv', (req, res) => {
  res.sendFile(path.join(__dirname, '../csv/1.csv'))
});

module.exports = router;





