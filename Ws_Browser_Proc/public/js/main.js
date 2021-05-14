let socket = io();
const result = document.querySelector('.result');
const procent = document.querySelector('#procent');
const inputValueDiv = document.querySelector('.input-value');

socket.on('messageToMainUser', message => {
  if (message.mainUser === true) {
    let str = '';
    message.users.splice(0, 1);
    message.users.forEach(el => {
      str = `${str}<div>${el.value}</div> `;
    });
    result.innerHTML = str;
  };
});

socket.on('messageToMainUserFromUsers', message => {
  let str = '';
  message.splice(0, 1);
  message.forEach(el => {
    str = `${str}<div>${el.value}</div> `;
  });
  result.innerHTML = str;
});

procent.addEventListener('change', ev => {
  inputValueDiv.innerHTML = ev.target.value;
  socket.emit('messageFromInput', ev.target.value);
});
