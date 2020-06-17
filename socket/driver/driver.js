'use strict';

const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');


let channel = '1-206-flowers'; 
caps.emit('join', channel);
caps.on('joined', (joinedChannel) => {
  channel = joinedChannel;
});


caps.on('message', (payload) => {
  if(!payload.event){
    pickUp(payload);
  }
});
function Event(event,time,payload){
  this.event =event;
  this.time = time;
  this.payload = payload;
}
function pickUp(payload){
  setTimeout(() => {
    console.log(`pickedup ${payload.orderID}`);
    caps.emit('message',new Event('pickup', new Date(), payload));
    inTransit(payload);
  }, 1500);
  
}
function inTransit(payload){
  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    caps.emit('message',new Event('in-transit', new Date(), payload));
    delivered(payload);
  }, 3000);
}
function delivered(payload){
  caps.emit('message',new Event('delivered', new Date(), payload));
  
}

