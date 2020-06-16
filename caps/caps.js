'use strict';
require('dotenv').config();
const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer(); 
server.listen(PORT, ()=> console.log(`listen to ${PORT}`));

let socketPool = {};

server.on('connection', (socket)=> {
  const id = `Socket-${Math.random()}`;
  console.log(`client with ID : ${id} is connected!!! `);
  socketPool[id] = socket;
  
  socket.on('data', (buffer)=> dispatchEvent(buffer));
  socket.on('error', (e) => {console.log('SOCKET ERR', e);});
  socket.on('end', (end) => {
    console.log('connection ended', end);
    delete socketPool[id];
  });
});

server.on('error', (e)=> {
  console.log('there is error in server', e);
});

function dispatchEvent(buffer) {
  let order = JSON.parse(buffer.toString().trim());
  if(order.event && order.payload){
    console.log(order);}
  broadcast(order);
}

function broadcast(order) {
  let payload = JSON.stringify(order);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
  
}
