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

      socket.on('pickup', (payload) => {
        if(payload.event && payload.payload){
          console.log('Event',payload);
        }
        caps.to(currentRoom).emit('pickup', payload);
      });
      socket.on('in-transit',event =>{
        console.log('Event',event);
        caps.to(currentRoom).emit('in-transit', event);
      });
      socket.on('delivered',event =>{
        console.log('Event',event);
        caps.to(currentRoom).emit('delivered', event);
      });
    });
  });
};