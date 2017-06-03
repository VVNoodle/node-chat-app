var socket = io();

function scrollToBtm () {
  var msgs = $('#messages');
  var clientHeight = msgs.prop('clientHeight'); //what we can see
  var scrollTop = msgs.prop('scrollTop'); //between what we can see and the top area
  var scrollHeight = msgs.prop('scrollHeight'); //THE WHOLE PART

  var newMessage= msgs.children('li:last-child');
  var newMsgHeight = newMessage.innerHeight(); //height of new message (not included in scrollHeight)
  var lastMsgHeight = newMessage.prev().innerHeight(); //height of prev msg

  if ((scrollTop+clientHeight+newMsgHeight+lastMsgHeight) >= scrollHeight) {
    msgs.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  const par = $.deparam(window.location.search);
  socket.emit('join', par, (err)=>{
    if (err) {
      alert(err);
      window.location.href = '/';
    }else {
      var title = $(document).find("title").text(`chat | ${par.room}`);
      console.log('No error');
    }
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
  var ol = $('<ol></ol>');
  users.forEach((userName)=>{
    ol.append($('<li></li>').text(userName));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: formattedTime,
    text: msg.text
  });

  $('#messages').append(html);
  scrollToBtm();
});

socket.on('newLocMsg', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: formattedTime,
    url: msg.url
  });

  $('#messages').append(html);
  scrollToBtm();
});

$('#message-form').on('submit', (e)=>{
  e.preventDefault();  //prevdents default behavior from that event, which initially refresh
  var msgTxtBox = $('[name = input]');
  socket.emit('createMessage', {
    text: msgTxtBox.val()
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
