'use strict';

const io = require('socket.io')(3000);
require('./app/app')(io);

io.on('connection', (socket) => {
  socket.on('error', (payload) => {
    io.emit('error', payload);
  });

  socket.on('action', (payload) => {
    io.emit('action', payload);
  });
});