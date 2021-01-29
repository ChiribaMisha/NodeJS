const request = require('request');
const fs = require('fs');
const http = require("http");
const host = 'localhost';
const port = 3000;

//№1

fs.unlink("./folder/deleteFile.txt", (err) => {
  if (err) {
    console.log('ERROR', err);
    return;
  };
});

fs.unlink("./folder1/deleteFile.txt", (err) => {
  if (err) {
    console.log('ERROR', err);
    return;
  };
});

const moveImg = (err) => {
  if (err) {
    console.log('ERROR', err);
    return;
  };
  fs.rename('./folder/image.svg', './folder1/image.svg', (err) => {
    if (err) {
      console.log('ERROR', err);
      return;
    }
  });
};

fs.writeFile('./folder/image.svg', '', 'utf-8', moveImg);

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



    const read = (error, data) => {
      if (error) throw error;

      const requestListener = (req, res) => {
        res.writeHead(200);
        res.end(`${data}`);
      };

      const server = http.createServer(requestListener);

      server.listen(port, host, () => {
        console.log(`server is running on http://${host}:${port}`);
      });
    };

    const write = (err) => {
      if (err) {
        console.log('ERROR', err);
        return;
      };

      fs.readFile("arr.txt", "utf8", read);
    }

    fs.writeFile('./arr.txt', str1, 'utf-8', write);


  };
});
