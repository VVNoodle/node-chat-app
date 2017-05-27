const socketIO = require('socket.io');
const express = require('express');

const path = require('path');
const http = require('http');

const publicPath = path.join(__dirname, '/..', '/public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('createMessage', function(indiMsg){
    console.log('createMessage ', indiMsg);
    io.emit('newMessage', {
      from: indiMsg.from,
      text: indiMsg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', ()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
