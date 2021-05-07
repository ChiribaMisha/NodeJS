const socket = io();
const form = document.querySelector('#form');
const input = document.querySelector('.text');
const result = document.querySelector('.result');

socket.on('message', message => {
  result.append(`${message} `)
});

form.addEventListener('submit', ev => {
  ev.preventDefault();
  socket.emit('message', `${input.value}`);
});


