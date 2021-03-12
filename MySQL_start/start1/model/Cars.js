const mysql = require('mysql2/promise');
const config = require('../config/db');

const getAllCars = async () => {
  const conn = await mysql.createConnection(config);
  const query = `SELECT * FROM cars`;
  const [rows, fields] = await conn.execute(query);
  conn.end();
  return rows;
};

module.exports = {
  getAllCars,
}