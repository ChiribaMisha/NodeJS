const form = document.querySelector('form');
const answEl = document.querySelector('.answ');
const dateTimeFrom = document.querySelector('input[name = dateTimeFrom]');
const dateTimeTo = document.querySelector('input[name = dateTimeTo]');

form.addEventListener('submit', ev => {
  ev.preventDefault();

  if (dateTimeFrom.value > dateTimeTo.value) {
    dateTimeFrom.style.border = "2px solid red";
    return;
  } else {
    dateTimeFrom.style.border = null;
  };

  const data = new FormData(form);

  axios.post('/review', data)
    .then(r => answEl.innerHTML = r.data)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
})
