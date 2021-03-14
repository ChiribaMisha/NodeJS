const formS = document.querySelector('#form-select');
const formI = document.querySelector('#form-insert');
const formD = document.querySelector('#form-delete');
const answEl = document.querySelector('.answ');
const inptFrom = document.querySelector('.from');
const inptTo = document.querySelector('.to');

const thenData = (r) => {
  let str = r.data.reduce((str, el) => {
    return `${str}<tr><td>${el.id}</td><td>${el.make}</td><td>${el.model}</td><td>${el.year}</td></tr>`;
  }, ' ');

  answEl.innerHTML = `
                         <table border ='1'>
                            <tr>
                              <th>id</th>
                              <th>make</th>
                              <th>model</th>
                              <th>year</th>
                            </tr>
                          ${str}
                         </table>                 

    `;
};

formS.addEventListener('submit', ev => {
  ev.preventDefault();

  const data = new FormData(formS);
  axios.post('/years', data)
    .then(thenData)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
  formS.reset();
});

formI.addEventListener('submit', ev => {
  ev.preventDefault();

  const data = new FormData(formI);
  axios.post('/insert', data)
    .then(thenData)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
  formI.reset();
});

formD.addEventListener('submit', ev => {
  ev.preventDefault();

  const data = new FormData(formD);
  axios.post('/delete', data)
    .then(thenData)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
  formD.reset();
});