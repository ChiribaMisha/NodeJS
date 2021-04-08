const form = document.querySelector('#form');
const result = document.querySelector('.result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  axios.post('/add', data)
    .then(r => {
      if (r.data === 'OK') {
        result.innerHTML = 'OK'
        const inputs = document.querySelectorAll('input');
        inputs.forEach(el => {
          el.style.border = "";
        });
      } else {
        if (Array.isArray(r.data) === true) {
          let str = '';
          const inputs = document.querySelectorAll('input');
          inputs.forEach(el => {
            el.style.border = "";
          });
          r.data.forEach(el => {
            const inputError = document.querySelector(`input[name="${el.slice(1)}"]`);
            inputError.style.border = "1px solid red";
            str = `${str}${el.slice(1)}, `;
            result.innerHTML = `Ошибка в поле ${str}`;
          })
        } else {
          const inputs = document.querySelectorAll('input');
          inputs.forEach(el => {
            el.style.border = "";
          });
          result.innerHTML = `Ошибка в поле ${r.data.slice(1)}`;
          const inputError = document.querySelector(`input[name="${r.data.slice(1)}"]`);
          inputError.style.border = "1px solid red";
        }
      }

    })
    .catch(err => console.log(err));
});
