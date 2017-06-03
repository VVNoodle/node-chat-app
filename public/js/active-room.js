var socket = io();

var  insertRoom = function(room){
  $('#test').val(room);
};

socket.on('connect', function(){
    socket.on('roomList', (par)=>{
      for (var i = 0; i < par.list.length; i++) {
        if (par.list.length !== 0) {
          var template = $('#room-template').html();
          var html = Mustache.render(template, {
            roomName: par.list[i],
            // insertRoom: insertRoom(par.list[i])
          });
          $('.dropdown-menu').append(html);
        }
      }
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
