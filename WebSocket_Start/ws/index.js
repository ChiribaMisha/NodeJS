const socket = require('socket.io');

const wsServer = (serv) => {
  let clients = [];
  const io = socket(serv);

  io.on('connection', socket => {
    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);

    const getRandomInt = () => {
      return Math.floor((10 - 1) * Math.random() + 1) * 1000;
    };
    setInterval(() => {
      socket.emit('message', "I'm server");
    }, getRandomInt());

    socket.on('message', message => console.log('Message', message));

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      console.log(`Client with id ${socket.id} disconnected`);
    })
  })
}

module.exports = {
  wsServer
};
