const form = document.querySelector('form');
const answEl = document.querySelector('.answ');
const authorEl = document.querySelector('.author');
const dateEl = document.querySelector('.date');
const textareaEl = document.querySelector('.textarea');


form.addEventListener('submit', ev => {
  ev.preventDefault();

  if (authorEl.value.match(/^[a-z а-я . -]+$/i) === null) {
    authorEl.classList.add('invalid');
    return;
  };

  if (dateEl.value.match(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i) === null) {
    dateEl.classList.add('invalid');
    return;
  };

  if (textareaEl.value.match(/^[a-z а-я 0-9 . , -]+$/i) === null) {
    textareaEl.classList.add('invalid');
    return;
  };


  const data = new FormData(form);
  axios.post('/', data)
    .then(r => answEl.innerHTML = `OK: ${r.data}`)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`)
})
