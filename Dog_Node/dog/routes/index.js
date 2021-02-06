const express = require('express');
const router = express.Router();
const request = require('request');
const axios = require('axios');
const fs = require('fs').promises;

const url = 'https://dog.ceo/api/breeds/list/all';

router.get('/', (req, res) => {
  axios
    .get(url)
    .then(r => r.data.message)
    .then(r => Object.keys(r))
    .then(r => {
      const dogArr = r;
      res.render('index', { dogArr: dogArr })
    })
});

router.get('/:dog', (req, res) => {
  const dog = req.params.dog;
  const url1 = `https://dog.ceo/api/breed/${dog}/images/random`;
  axios
    .get(url1)
    .then(r => r.data.message)
    .then(r => res.render('dog', { image: r }))
});

module.exports = router;
