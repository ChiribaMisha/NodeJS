const formS = document.querySelector('#form-select');
const formI = document.querySelector('#form-insert');
const answEl = document.querySelector('.answ');

const thenData = (r) => {
  let str = r.data.reduce((str, el) => {
    return `${str}
    <div class = "all">
    <div id ="id_${el.id}">${el.id}) ${el.make} ${el.model} ${el.year}</div>
    <button class = "delete ${el.id}"><i class="icon-cancel"></i></button>
    <button class = "edit ${el.id}"><i class="icon-pencil"></i></button>
    </div>`;
  }, ' ');

  answEl.innerHTML = str;
};

const thenDelete = (r) => {
  const deleteButton = document.querySelectorAll('.delete');

  deleteButton.forEach(el => {
    el.addEventListener('click', event => {
      axios.post('/delete', { id: el.classList[1] })
        .then(thenData)
        .then(thenDelete)
        .then(thenEdit)
        .catch(e => answEl.innerHTML = `ERROR: ${e}`);
    });
  });
}

const thenEdit = (r) => {
  const editButton = document.querySelectorAll('.edit');

  editButton.forEach(el => {
    el.addEventListener('click', event => {
      const divCar = document.querySelector(`#id_${el.classList[1]}`);
      const divCarInnerArr = divCar.innerHTML.split(" ");
      const carWithoutSpacesArr = [];

      divCarInnerArr.forEach(el => {
        if (el.length !== 0) {
          carWithoutSpacesArr.push(el);
        };
      });

      divCar.innerHTML = `
                            ${carWithoutSpacesArr[0]} 
                            <input type="text" name = "make-edit" class = "make-edit input-edit" value ="${carWithoutSpacesArr[1]}">
                            <input type="text" name = "model-edit" class = "model-edit input-edit" value ="${carWithoutSpacesArr[2]}">
                            <input type="text" name = "year-edit" class = "year-edit input-edit" value ="${carWithoutSpacesArr[3]}">
                            <button class ="OK">OK</button>
                            `;

      const inputEdit = document.querySelectorAll('.input-edit');
      const inputMakeEdit = document.querySelector('.make-edit');
      const inputModelEdit = document.querySelector('.model-edit');
      const inputYearEdit = document.querySelector('.year-edit');

      inputEdit.forEach(el => {
        el.style.width = ((el.value.length + 1) * 8) + 'px';
        el.addEventListener('keyup', ev => {
          el.style.width = ((el.value.length + 1) * 8) + 'px';
        });
      });

      const buttonOk = document.querySelector('.OK');
      const carID = carWithoutSpacesArr[0].slice(0, -1);

      buttonOk.addEventListener('click', event => {
        axios.post('/update', {
          make: inputMakeEdit.value,
          model: inputModelEdit.value,
          year: inputYearEdit.value,
          id: carID,
        })
          .then(thenData)
          .then(thenDelete)
          .then(thenEdit)
          .catch(e => answEl.innerHTML = `ERROR: ${e}`);
      });
      el.setAttribute("disabled", "disabled");
    });
  });
};


formS.addEventListener('submit', ev => {
  ev.preventDefault();

  const data = new FormData(formS);
  axios.post('/years', data)
    .then(thenData)
    .then(thenDelete)
    .then(thenEdit)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
  formS.reset();
});

formI.addEventListener('submit', ev => {
  ev.preventDefault();

  const data = new FormData(formI);
  axios.post('/insert', data)
    .then(thenData)
    .then(thenDelete)
    .then(thenEdit)
    .catch(e => answEl.innerHTML = `ERROR: ${e}`);
  formI.reset();
});



