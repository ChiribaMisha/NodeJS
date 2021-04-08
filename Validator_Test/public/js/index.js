const form = document.querySelector('#form');
const result = document.querySelector('.result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  axios.post('/add', data)
    .then(r => {
      console.log(r.data);
      if (r.data === 'OK') {
        result.innerHTML = 'OK'
        const inputs = document.querySelectorAll('input');
        inputs.forEach(el => {
          el.style.border = "";
        });
      } else {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(el => {
          el.style.border = "";
        });
        result.innerHTML = `Ошибка в поле ${r.data.slice(1)}`;
        const inputError = document.querySelector(`input[name="${r.data.slice(1)}"]`);
        inputError.style.border = "1px solid red";
      }

    })
    .catch(err => console.log(err));
});
