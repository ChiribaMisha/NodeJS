const formSearchYear = document.querySelector('#form-search-year');
const formSearchTag = document.querySelector('#form-search-tag');
const result = document.querySelector('.result');

formSearchYear.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(formSearchYear);
  axios.post('/search/year', data)
    .then(r => {
      let str = '';

      r.data.forEach(el => {
        str = `${str}<div>${el.title} ${el.article} ${el.tags} ${moment(el.date).format('DD-MM-YYYY')} ${el.author}</div>`;
      });

      result.innerHTML = str;
      formSearchYear.reset();
    })
    .catch(err => console.log(err));
});

formSearchTag.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(formSearchTag);
  axios.post('/search/tag', data)
    .then(r => {
      let str = '';

      r.data.forEach(el => {
        str = `${str}<div>${el.title} ${el.article} ${el.tags} ${moment(el.date).format('DD-MM-YYYY')} ${el.author}</div>`;
      });

      result.innerHTML = str;
      formSearchTag.reset();
    })
    .catch(err => console.log(err));
});