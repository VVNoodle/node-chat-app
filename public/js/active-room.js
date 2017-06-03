var socket = io();

var  insertRoom = function(room){
  if (room !== 'Empty') {
    $('#test').val(room);  
  }
};

socket.on('connect', function(){
    socket.on('roomList', (par)=>{
      if (par.list.length !== 0) {
        for (var i = 0; i < par.list.length; i++) {
            var template = $('#room-template').html();
            var html = Mustache.render(template, {
              roomName: par.list[i],
            });
            $('.dropdown-menu').append(html);
        }
      }else {
        var emptyPlate = $('#room-template').html();
        var emptyHTML = Mustache.render(emptyPlate, {
          roomName: 'Empty',
        });
        $('.dropdown-menu').append(emptyHTML);
      }
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
