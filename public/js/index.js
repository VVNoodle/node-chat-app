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

socket.on('newLocMsg', function(msg){
  var li = $('<li></li>');
  var a = $(`<a target="_blank">My location</a>`);
console.log(a);
  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e)=>{
  e.preventDefault();  //prevdents default behavior from that event, which initially refresh
  var msgTxtBox = $('[name = input]');
  socket.emit('createMessage', {
    from:'User',
    text: msgTxtBox.val(),
  }, ()=>{
     msgTxtBox.val("");
  });
});

var locButton = $('#send-loc');
locButton.on('click', (e)=>{
  if (!navigator.geolocation) {
    return alert('no geolocation detected');
  }
  locButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition((pos)=>{
    console.log(pos);
    locButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocMsg', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
  }, (err)=>{
    locButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch geolocation');
  });
});
