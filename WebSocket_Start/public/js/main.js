const socket = io();
const button = document.querySelector('.sendMessage');

socket.on('message', message => console.log('Message from server:', message));

button.addEventListener('click', ev => {
  socket.emit('message', "I'm client");
});