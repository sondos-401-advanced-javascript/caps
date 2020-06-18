'use strict';
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const faker = require('faker');
const { clearInterval } = require('timers');
const STORE_NAME = process.env.STORE_NAME || 'BigStore';

client.connect(PORT, HOST, ()=> {console.log('vendor got connected');});

client.on('data', function(data) {
  let event = JSON.parse(data); 
  if(event.event === 'delivered'){
    console.log(`Thank you for delivering ${event.payload.orderID}`);
  }
});
let timeInterval;
function sendMessage() {
  timeInterval= setInterval(() => {
    let payload = {
      store: STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    client.write(JSON.stringify(payload));
  }, 5000);
  
}
sendMessage();

client.on('close', function() {
  clearInterval(timeInterval);
  console.log('connection closed');
});