const Cars = require('../model/Cars');
const moment = require('moment');

const getCarsStoreSales = async (req, res) => {
  const result = await Cars.getCarsSales();
  result.forEach(el => {
    el.date = moment(el.date).format('DD-MM-YYYY');
  });

  res.render('index', { result: result });
}

module.exports = {
  getCarsStoreSales,
};
