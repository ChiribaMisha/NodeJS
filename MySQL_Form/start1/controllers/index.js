const Cars = require('../model/Cars');


const getIndexPage = (req, res) => {
  res.render('index');
};

const getCarsFromToYears = async (req, res) => {
  const { from, to } = req.body;
  const result = await Cars.getCarsByYear(from, to);
  res.send(result);
};

const insertCar = async (req, res) => {
  const { make, model, year } = req.body;
  await Cars.insertRow(make, model, year);
  const result = await Cars.getAllCars();
  res.send(result);
};

const deleteCar = async (req, res) => {
  const { id } = req.body;
  await Cars.deleteCarByID(id);
  const result = await Cars.getAllCars();
  res.send(result);
};

module.exports = {
  getIndexPage,
  getCarsFromToYears,
  insertCar,
  deleteCar,
};
