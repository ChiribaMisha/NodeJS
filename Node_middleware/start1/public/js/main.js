const formEl = document.querySelector('.form');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', ev => {
  ev.preventDefault();
  const data = new FormData(formEl);
  axios.post('/form', data)
    .then(r => answEl.innerHTML = r.data)
    .catch(err => console.log(err));
});





