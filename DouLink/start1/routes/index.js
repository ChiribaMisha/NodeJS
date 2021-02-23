const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const linkArr = await axios.get("https://dou.ua/")
    .then(r => {
      let reg = /\/?[^)''"]+\.(?:jpg|jpeg|gif|png|svg)(?![a-z/])/gi;
      const out = r.data.match(reg);
      return out;
    });

  res.render('index');
});

module.exports = router;





