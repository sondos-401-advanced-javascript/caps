'use strict';

const events = require('./events');


events.on('pickup',payload => pick('pickup',payload));
events.on('in-transit',payload => transit('in-transit',payload));
events.on('delivered',payload => delivered('delivered',payload));


function Event(event,time,payload){
  this.event =event;
  this.time = time;
  this.payload = payload;
}

function pick(state,payload){
  let time = new Date();
  console.log(new Event(state,time,payload));
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('in-transit',payload);},1000);
}
    
function transit(state,payload){
  let time = new Date();
  console.log(new Event(state,time,payload));
  setTimeout(()=>{
    console.log(`DRIVER: delivered up ${payload.orderID}`);
    events.emit('delivered',payload);},3000); 
}
    
function delivered(state,payload){
  let time = new Date();
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  console.log(new Event(state,time,payload));
}




