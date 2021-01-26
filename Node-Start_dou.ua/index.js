const request = require('request');
const fs = require('fs');

request('https://dou.ua/', function (error, response, body) {
  if (error) {
    console.log('ERROR!');
  } else {
    let str = body;
    let tempArr = str.split('>')
      .map(el => el.slice(el.indexOf('CACHE/images/img/announces')))
      .filter(el => el.includes('announce'))
      .map(el => el.slice(0, el.indexOf('"')))
    let arrNameImg = tempArr.map(el => el.slice(el.lastIndexOf('/')));
    let linkImages = '';
    let srcImages = '';
    for (let i = 0; i < tempArr.length; i++) {
      linkImages = 'https://s.dou.ua/' + `${tempArr[i]}`;
      srcImages = './images' + `${arrNameImg[i]}`;
      request(linkImages).pipe(fs.createWriteStream(srcImages));
    }
  }
});

// request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))

