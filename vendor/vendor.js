'use strict';
const faker = require('faker')
const socketioClient =require ('socket.io-client')

const flowerSocket = socketioClient.connect('http://localhost:3000/csps');
const candySocket = socketioClient.connect('http://localhost:3000/csps');

flowerSocket.emit('join', 'flower-shop');
candySocket.emit('join', 'candy-shop');

flowerSocket.on('delivered', (payload) => {
  console.log('Flower-Shop: Thank you for delivering', payload.orderId);
});

candySocket.on('delivered', (payload) => {
  console.log('Candy-Shop: Thank you for delivering', payload.orderId);
});


setInterval(() => {
  let flowerOrder = {
    time: Date(),
    store: 'flower-shop',
    orderId: faker.random.uuid(),
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  }
  flowerSocket.emit('pickup', flowerOrder)
}, 5000)

setTimeout( () => {


setInterval(() => {
  let candyOrder = {
    time: Date(),
    store: 'candy-shop',
    orderId: faker.random.uuid(),
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),

  }
  candySocket.emit('pickup', candyOrder)
}, 5000)
}, 3000)