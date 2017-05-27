// const {generateMessage} = require('./../../server/utils/message.js');
var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(msg){
  console.log('newMessage, ', msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  $('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Egan',
  text: 'Hi'
}, function(confirmation){
  console.log('Got it,', confirmation);
});

$('#message-form').on('submit', (e)=>{
  //prevents default behavior from that event, which initially refresh
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text: $('[name = input]').val(),
    createdAt: new Date().getTime(),
  }, ()=>{
    // console.log();
  });
});
