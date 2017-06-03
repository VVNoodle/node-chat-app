var socket = io();

var  insertRoom = function(room){
  if (room !== 'Empty') {
    $('#test').val(room);
  }
  $(".dropdown-content").toggle();
};

$(".dropbtn").on('click', ()=>{
  $(".dropdown-content").css("display", "block");
});

socket.on('connect', function(){
    socket.on('roomList', (par)=>{
      if (par.list.length !== 0) {
        for (var i = 0; i < par.list.length; i++) {
            var template = $('#room-template').html();
            var html = Mustache.render(template, {
              roomName: par.list[i],
            });
            $('.dropdown-content').append(html);
        }
      }else {
        var emptyPlate = $('#room-template').html();
        var emptyHTML = Mustache.render(emptyPlate, {
          roomName: 'Empty',
        });
        $('.dropdown-content').append(emptyHTML);
      }
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
