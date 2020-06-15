'use strict';
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const STORE_NAME = process.env.STORE_NAME || 'BigStore';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, ()=> {console.log('connect driver');});

const messages = [];
function Event(event,time,payload){
  this.event =event;
  this.time = time;
  this.payload = payload;
}



client.on('data', function(data){ 
  let eventObj = JSON.parse(data);
  if (eventObj.event === 'pickup') {
    console.clear();
    messages.push(`pickedup ${eventObj.payload.orderID}`);
    messages.forEach(msg=> console.log(msg));
  }
  else if(eventObj.event === 'in-transit'){
    console.clear();
    messages.push(`delivered ${eventObj.payload.orderID}`);
    messages.forEach(msg=> console.log(msg));
  }
  console.log();

});


function sendMessage() {
  setInterval(() => {
    let payload = {
      store: STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    pickUp(payload);
  }, 5000);
  
}
sendMessage();
function pickUp(payload){
  setTimeout(() => {
    let event = JSON.stringify(new Event('pickup', new Date(), payload));
    client.write(event);
    inTransit(payload);
  }, 1000);

}
function inTransit(payload){
  setTimeout(() => {
    let event = JSON.stringify(new Event('in-transit', new Date(), payload));
    client.write(event);
    delivered(payload);
  }, 3000);
}
function delivered(payload){
  let event = JSON.stringify(new Event('delivered', new Date(), payload));
  client.write(event);
}


