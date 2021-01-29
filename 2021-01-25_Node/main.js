const request = require('request');
const cheerio = require('cheerio');
const http = require("http");
const host = 'localhost';
const port = 3000;

const url = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&body.id[4]=2&year[0].gte=2012&year[0].lte=2012&categories.main.id=1&brand.id[0]=6&price.currency=1&gearbox.id[1]=2&gearbox.id[2]=3&fuel.id[1]=2&drive.id[0]=1&abroad.not=0&custom.not=1&page=0&size=50';

request(url, (error, response, body) => {
  let str1 = 'ticket-item new__ticket t';
  out = body.split(str1)
    .filter(el => el.includes('data-main-price'))
    .map(el => {
      let tempObj = {};
      let che = cheerio.load(el);
      tempObj.price = che('.price-ticket')[0].attribs['data-main-price'];
      tempObj.model = che('.hide')[0].attribs['data-model-name'];
      tempObj.brand = che('.hide')[0].attribs['data-mark-name'];
      tempObj.year = che('.hide')[0].attribs['data-year'];
      return tempObj;
    });

  let str5 = '';
  for (let i = 0; i < out.length; i++) {
    str5 = `${str5}<tr><td>${out[i].brand}</td><td>${out[i].model}</td><td>${out[i].year}</td><td>${out[i].price}</td></tr>`;
  }

  let bodySite = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table</title>
  </head>
  
  <body>
    <table style=" border: 1px solid black" cellpadding="5">
      <tr>
        <th>Brand</th>
        <th>Model</th>
        <th>Year</th>
        <th>Price</th>
      </tr>
      ${str5}
    </table>
  </body>
  
  </html>`;

  const requestListener = (req, res) => {
    res.write(bodySite);
    res.end();
  };

  const server = http.createServer(requestListener);

  server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
  });
});