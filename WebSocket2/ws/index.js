const socket = require('socket.io');

const wsServer = (serv) => {
  let clients = [];
  const io = socket(serv);

  io.on('connection', socket => {
    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);

    socket.on('message', message => {
      socket.emit('message', `${message}1`);

      setTimeout(() => {
        socket.emit('message', `${message}2`);
      }, 1000);
    });

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      console.log(`Client with id ${socket.id} disconnected`);
    })
  })
}

module.exports = {
  wsServer
};



