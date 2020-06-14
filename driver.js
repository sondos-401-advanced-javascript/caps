'use strict';

const events = require('./events');

class Event{
  pick(state,payload){
    let time = new Date();
    console.log({state, time, payload});
    
    setTimeout(()=>{
      console.log(`DRIVER: picked up ${payload.orderID}`);
      events.emit('in-transit',payload);},1000);
  }
    
  transit(state,payload){
    let time = new Date();
    console.log({state, time, payload});
    
    setTimeout(()=>{
      console.log(`DRIVER: delivered up ${payload.orderID}`);
      events.emit('delivered',payload);},3000); 
  }
    
  delivered(state,payload){
    let time = new Date();
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    console.log({state, time, payload});
  }
}

let eventClass = new Event();
events.on('pickup',payload => eventClass.pick('pickup',payload));
events.on('in-transit',payload => eventClass.transit('in-transit',payload));
events.on('delivered',payload => eventClass.delivered('delivered',payload));

