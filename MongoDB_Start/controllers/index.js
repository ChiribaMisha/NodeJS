const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

const render = (req, res) => {
  let users = [{ name: "Bob", age: 34 }, { name: "Alice", age: 21 }, { name: "Tom", age: 45 }];

  mongoClient.connect((err, client) => {


    const db = client.db('CA_start');
    const collection = db.collection('test');
    collection.find().toArray(function (err, results) {

      console.log(results);
      res.render('index', { data: results });
    });
  });


};

module.exports = {
  render,
}