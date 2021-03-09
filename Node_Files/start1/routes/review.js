const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer()
const fsProm = require('fs').promises;
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const moment = require('moment');
moment().format();

router.get('/', (req, res) => {
  res.render('review');
});


const getListFiles = async () => {
  const filesName = await fsProm.readdir("./uploads");
  const filesProm = filesName.map(el => {
    return fsProm.stat(`./uploads/${el}`).then(big => {
      return {
        name: el,
        size: big.size,
        time: moment(big.birthtime).format("YYYY-MM-DD HH:mm"),
      };
    });
  });
  return await Promise.all(filesProm);
};

let dateTimeFrom = null;
let dateTimeTo = null;
let filesArr = null;

router.post('/', upload.none(), async (req, res) => {
  dateTimeFrom = moment(req.body.dateTimeFrom).format("YYYY-MM-DD HH:mm");
  dateTimeTo = moment(req.body.dateTimeTo).format("YYYY-MM-DD HH:mm");
  filesArr = await getListFiles();

  let str = '';

  filesArr.forEach(el => {
    if (el.time > dateTimeFrom && el.time < dateTimeTo) {
      str = `${str}
              <tr><td>${el.name}</td><td>${(el.size / 1e6).toFixed(2)}МБ</td><td>${moment(el.time).format("DD-MM-YYYY HH:mm")}</td></tr>
            `;
    };
  });

  if (str === '') {
    str = `Загруженных файлов за этот период НЕТ`;
  } else {
    str = `
          <table border = "1">
          <tr>
            <th>Имя</th>
            <th>Размер</th>
            <th>Дата записи</th>
          </tr>
          ${str}
        </table>
        <button><a href="/review/download">Скачать всё</a></button>
       `;
  }
  res.send(str);
});


router.get('/download', (req, res) => {
  const output = fs.createWriteStream('./zip/files.zip');
  const archive = archiver('zip', {
    zlib: { level: 2 }
  });

  output.on('close', () => {
    res.sendFile(path.join(__dirname, '../zip/files.zip'));
  });

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  filesArr.forEach(el => {
    if (el.time > dateTimeFrom && el.time < dateTimeTo) {
      archive.file(`./uploads/${el.name}`, { name: `${el.name}` });
    };
  });

  archive.finalize();

});

module.exports = router;





