'use strict';

const net = require('net');

const client = new net.Socket();


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log('vendor got connected');});

client.on('data', function(data) {
  let event = JSON.parse(data); 
  if(event.event === 'delivered'){
    console.log(`Thank you for delivering ${event.payload.orderID}`);
  }
});

client.on('close', function() {
  console.log('connection closed');
});