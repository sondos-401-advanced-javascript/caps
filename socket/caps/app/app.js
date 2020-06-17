'use strict';

module.exports = (io) => {
  const caps = io.of('/caps'); 
  caps.on('connection', (socket) => {

    console.log('Welcome to the Caps App!', socket.id);
    let currentRoom = '';
   
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;
      io.emit('action', `Someone joined the room: ${room}`);
      
      caps.to(`${socket.id}`).emit('joined', room);

      socket.on('message', (payload) => {
        if(payload.event && payload.payload){
          console.log('Event',payload);
        }  
        caps.to(currentRoom).emit('message', payload);
      });
    });
  });
};