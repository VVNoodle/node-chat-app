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
  e.preventDefault();  //prevents default behavior from that event, which initially refresh
  socket.emit('createMessage', {
    from:'User',
    text: $('[name = input]').val(),
    createdAt: new Date().getTime(),
  }, ()=>{
    // console.log();
  });
});

var locButton = $('#send-loc');
locButton.on('click', (e)=>{
  if (!navigator.geolocation) {
    return alert('no geolocation detected');
  }
  navigator.geolocation.getCurrentPosition((pos)=>{
    console.log(pos);
    socket.emit('createLocMsg', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
  }, (err)=>{
    alert('Unable to fetch geolocation');
  });
});
