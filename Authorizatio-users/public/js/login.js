const form = document.querySelector('#form');
const inptName = document.querySelector('input[name="name"]');
const result = document.querySelector('.result');
const button = document.querySelector('.button');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  axios.post('/login/login', data)
    .then(r => {
      if (r.data.status === 'OK') {
        const inputs = document.querySelectorAll('input');

        inputs.forEach(el => {
          el.style.border = "";
        });

        location.href = `/login/welcom${r.data.userName}`;

      } else if (r.data.Error === true) {
        result.innerHTML = r.data.info;

      } else {
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

        });
      };
    })
    .catch(err => console.log(err));
});
