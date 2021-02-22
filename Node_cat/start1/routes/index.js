const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const axios = require('axios');

router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/', upload.none(), async (req, res) => {

  // Country

  const urlCountries = `https://restcountries.eu/rest/v2/region/${req.body.region}`;

  const getCountriesArr = async (url) => {
    const countriesObj = await axios.get(url);

    return countries = countriesObj.data.map(el => {
      return { name: el.name, flag: el.flag, code: el.alpha2Code };
    })
  };

  const countriesAll = await getCountriesArr(urlCountries);


  // Cat

  const urlCat = `https://api.thecatapi.com/v1/breeds`;

  const getCatArr = async (url) => {
    const catObj = await axios.get(url);

    return cat = await Promise.all(catObj.data.map(async (el) => {

      const catUrl = () => {
        return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${el.id}`)
          .then(r => r.data)
          .then(e => e.map(el => el.url))
      }

      return { name: el.name, code: el.country_code, img: (el.image === undefined || el.image.url === undefined) ? await catUrl() : el.image.url };
    }));
  };

  const catAll = await getCatArr(urlCat);

  // Send

  const r = { country: countriesAll, cat: catAll };

  res.send(r);
});

module.exports = router;





