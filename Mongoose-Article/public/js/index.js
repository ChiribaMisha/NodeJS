const formAdd = document.querySelector('#form-add');
const result = document.querySelector('.result');

formAdd.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(formAdd);
  axios.post('/add', data)
    .then(r => {
      if (Array.isArray(r.data) === true) {
        let str = '';

        r.data.forEach(el => {
          str = `${str}<div>${el.title} ${el.article} ${el.tags} ${moment(el.date).format('DD-MM-YYYY')} ${el.author}</div>`;
        });

        result.innerHTML = str;

        formAdd.reset();
      } else {
        result.innerHTML = `Ошибка в поле <span style="color: red">${r.data}</span>`;
      };
    })
    .catch(err => console.log(err));
});
