'use strict';
const faker = require('faker');
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');
const STORE_NAME = process.env.STORE_NAME || '1-206-flowers';
let channel = '1-206-flowers'; 
caps.emit('join', channel);

caps.on('joined', (joinedChannel) => {
  channel = joinedChannel;
});


caps.on('delivered', (payload) => {
  if(payload.event === 'delivered'){
    console.log(`Thank you for delivering ${payload.payload.orderID}`);
  }
});

function sendMessage() {
  setInterval(() => {
    let payload = {
      store: STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    caps.emit('pickup',payload);
  }, 5000);
}
sendMessage();