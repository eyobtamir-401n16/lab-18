'use strict';

const socketio = require('socket.io');
const port = process.env.PORT || 3000;
const server = socketio(port , () => {
  console.log('Server is up and running on', port)
});

server.on('connection', (socket) => {
  console.log('connected to socket', socket.id)
});

const cspsIo = server.of('/csps')

cspsIo.on('connection', (socket) => {
  console.log('csps connected to ', socket.id);

  socket.on('join', (payload) => {
    socket.join(payload);
});

  socket.on('pickup', (payload) => {
    console.log('pickup');
    console.log('- Time: ', payload.time)
    console.log('- Store: ', payload.store)
    console.log('- OrderID: ', payload.orderId)
    console.log('- Customer: ', payload.customer)
    console.log('- Address: ', payload.address)
    console.log('********************')

    cspsIo.to('driver').emit('pickup', payload);
    });
    socket.on('delivered', (payload) => {
      cspsIo.to(payload.store).emit('delivered', payload);
    });
  })




