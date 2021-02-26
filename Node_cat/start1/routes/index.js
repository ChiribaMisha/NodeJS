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

  const countriesArr = await getCountriesArr(urlCountries);


  // Cat

  const urlCatsMain = `https://api.thecatapi.com/v1/breeds`;
  const objCatsMain = await axios.get(urlCatsMain);
  const arrCatsMain = objCatsMain.data;

  const arrCats = await Promise.all(arrCatsMain.map(el => {
    return new Promise((resolve, reject) => {
      if (el.image === undefined || el.image.url === undefined) {
        axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${el.id}`)
          .then(img => {
            resolve({
              name: el.name,
              code: el.country_code,
              img: img.data[0].url,
            })
          })
          .catch(err => console.log(err));
      } else {
        resolve({
          name: el.name,
          code: el.country_code,
          img: el.image.url
        });
      };
    });
  }));


  // Send

  const r = { country: countriesArr, cat: arrCats };

  res.send(r);
});

module.exports = router;





