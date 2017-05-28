const socketIO = require('socket.io');
const express = require('express');

const path = require('path');
const http = require('http');

const {generateMessage, generateLocMsg} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '/..', '/public');
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('join', (par, callback)=>{
    if(!isRealString(par.name) || !isRealString(par.room)){
      callback("Invalid params.");
    }
    socket.join(par.room);

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(par.room).emit('newMessage', generateMessage('Admin', `${par.name} has joined the chat`));
    callback();
  });

  socket.on('createMessage', (indiMsg, callback)=>{
    io.emit('newMessage', generateMessage(indiMsg.from,indiMsg.text));
    callback();
  });

  socket.on('createLocMsg', (loc)=>{
    io.emit('newLocMsg', generateLocMsg('Admin', loc.lat, loc.lng));
  });

  socket.on('disconnect', ()=>{
    console.log('Client disconnected');
  });
});//end ON CONNECTION

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
