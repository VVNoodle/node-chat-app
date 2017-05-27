var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

  socket.emit('createMessage', {
    from: 'egan',
    text: 'gotcha, this is also a test'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(msg){
  console.log(msg);
});
