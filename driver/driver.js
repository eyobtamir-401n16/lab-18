'use strict';

const socketioClient = require('socket.io-client')
const driverIo = socketioClient.connect('http://localhost:3000/csps');

driverIo.emit('join', 'driver');
driverIo.on('pickup', (payload) => {

  setTimeout(() => {
    driverIo.emit('in-transit', payload);
    console.log('pickedUp', payload.orderId);

    setTimeout(() => {
      driverIo.emit('delivered', payload);
      console.log('delivered', payload.orderId);
    }, 3000);
  }, 1000);
})
