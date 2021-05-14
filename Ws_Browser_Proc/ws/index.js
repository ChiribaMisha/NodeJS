const socketio = require('socket.io');

const wsServer = (srv) => {
  const io = socketio(srv);

  const clients = [];
  const usersArr = [];

  io.on('connection', socket => {

    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);
    const newUser = new Object({
      id: socket.id,
      value: 0
    });

    usersArr.push(newUser);
    socket.broadcast.to(clients[0]).emit('messageToMainUser', { mainUser: true, users: usersArr });

    socket.on('messageFromInput', (msg) => {
      newUser.value = msg;

      const userIndex = usersArr.findIndex(o => o.id === newUser.id);
      usersArr[userIndex] = newUser;

      socket.broadcast.to(clients[0]).emit('messageToMainUserFromUsers', usersArr);
    });

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      const disconnectUserIndex = usersArr.findIndex(o => o.id === socket.id);

      try {
        if (disconnectUserIndex === -1 && usersArr[0].id === clients[0]) {
          usersArr.splice(0, 1);
        };
        if (usersArr[disconnectUserIndex]) {
          usersArr.splice(disconnectUserIndex, 1);
        };
      } catch (error) {
        console.log('Все пользователи отключены');
      };

      socket.broadcast.to(clients[0]).emit('messageToMainUser', { mainUser: true, users: usersArr });
      console.log(`Client with id ${socket.id} disconnected`)
    });
  })
}

module.exports = wsServer;