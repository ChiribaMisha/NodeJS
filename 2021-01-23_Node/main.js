const request = require('request');
const fs = require('fs');
const http = require("http");
const host = 'localhost';
const port = 8000;

//№1

fs.writeFile('./files/image.svg', '', 'utf-8', (err) => {
  if (err) {
    console.log('ERROR', err);
    return;
  };

  fs.rename('./files/image.svg', './files1/image.svg', (err) => {
    if (err) {
      console.log('ERROR', err);
      return;
    };
  });
});

//№2

request('https://dou.ua/', function (error, response, body) {
  if (error) {
    console.log('ERROR!');
  } else {
    let str = body;
    let tempArr = str.split('>')
      .map(el => el.slice(el.indexOf('https://s.dou.ua/CACHE/images/img/announces/')))
      .filter(el => el.includes('announce'))
      .map(el => el.slice(0, el.indexOf('"')));

    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i] = `<div style ="margin: 10px">
                          <img src="${tempArr[i]}">
                    </div>`;
    };

    let str1 = tempArr.join("\n");

    fs.writeFile('./arr.txt', str1, 'utf-8', (err) => {
      if (err) {
        console.log('ERROR', err);
        return;
      };
    });

    fs.readFile("arr.txt", "utf8", (error, data) => {
      if (error) throw error;
      let a = data;
      const requestListener = (req, res) => {

        res.writeHead(200);
        res.end(`${a}`);
      };

      const server = http.createServer(requestListener);

      server.listen(port, host, () => {
        console.log(`server is running on http://${host}:${port}`);
      });
    });
  };
});
