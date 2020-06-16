'use strict';
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
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
  if(!eventObj.event){   
    pickUp(eventObj);
  }
});
let timeOut1;
let timeOut2;

function pickUp(payload){
  timeOut1= setTimeout(() => {
    messages.push(`pickedup ${payload.orderID}`);
    console.log(`pickedup ${payload.orderID}`);
    let event = JSON.stringify(new Event('pickup', new Date(), payload));
    client.write(event);
    inTransit(payload);
  }, 1000);

}
function inTransit(payload){
  timeOut2= setTimeout(() => {
    messages.push(`delivered ${payload.orderID}`);
    console.log(`delivered ${payload.orderID}`);
    let event = JSON.stringify(new Event('in-transit', new Date(), payload));
    client.write(event);
    delivered(payload);
  }, 3000);
}
function delivered(payload){
  let event = JSON.stringify(new Event('delivered', new Date(), payload));
  client.write(event);
}
client.on('close', function() {
  clearTimeout(timeOut2);
  clearTimeout(timeOut1);
  console.log('connection closed');
});


