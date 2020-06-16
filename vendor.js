'use strict';

require('dotenv').config();
const faker = require('faker');
let STORE_NAME = process.env.STORE_NAME || 'BigStore';

const events = require('./events');

events.on('order', Event);


function Event() {
 
  
  setInterval(() => {
    let payload = {
      store: STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    console.log(`new Order`);
    events.emit('pickup', payload);  
  }, 5000);
  
}