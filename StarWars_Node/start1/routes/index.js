var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/people/:number', async (req, res) => {
  let number = req.params.number;
  const arr = await axios.get(`http://swapi.dev/api/people/${number}`);

  const name = arr.data.name;

  const films = arr.data.films.map(el => {
    return axios.get(`${el}`);
  });

  const filmsArr = await Promise.all(films);
  const filmsName = filmsArr.map(e => e.data.title);

  const speciesArr = filmsArr.map(e => e.data.species);

  const tempArr = [];
  const speciesNameArr = [];

  for (i = 0; i < speciesArr.length; i++) {
    tempArr.push(
      speciesArr[i].map(el => {
        return axios.get(`${el}`).then(r => r.data.name);
      }))
    speciesNameArr.push(await Promise.all(tempArr[i]));
  }

  const r = { name: name, filmsName: filmsName, species: speciesNameArr }
  res.render('index', r)

});

module.exports = router;
