const mysql = require('mysql2/promise');
const config = require('../config/db');

const getCarsSales = async () => {
  const conn = await mysql.createConnection(config);
  const createTempTable = `CREATE TEMPORARY TABLE newusers SELECT * FROM users;`;

  const select = `SELECT date, CONCAT(make, ' ', model) as carname, price, users.name AS old_owner, newusers.name AS new_owner 
                  FROM cars, orders
                  INNER JOIN newusers, users
                  WHERE orders.new_owner_id = newusers.id AND cars.owner_id = users.id AND orders.car_id = cars.id
                  ORDER BY date DESC;`;

  const deleteTempTable = `drop temporary table newusers;`;

  await conn.execute(createTempTable);
  const [rows, fields] = await conn.execute(select);
  await conn.execute(deleteTempTable);

  conn.end();
  return rows;
}


module.exports = {
  getCarsSales,
};