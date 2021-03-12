const Cars = require('../model/Cars');

const getIndexPage = async (req, res) => {
  const currentCars = await Cars.getAllCars();

  const getCars = (arr, from, to) => {
    currentCars.map(el => {
      if (el.year >= from && el.year <= to) {
        arr.push(el);
      };
    });
  };

  const arrCar = [];

  getCars(arrCar, 2004, 2007);
  res.render('index', { car: arrCar });
};

module.exports = {
  getIndexPage,
}
