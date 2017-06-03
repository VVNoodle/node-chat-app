const socketIO = require('socket.io');
const express = require('express');
const _ = require('lodash');

const path = require('path');
const http = require('http');

const {generateMessage, generateLocMsg} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var userClass = new Users();

const publicPath = path.join(__dirname, '/..', '/public');
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('roomList', {list: userClass.getRoomList()});

  socket.on('join', (par, callback)=>{
    var lowerRoom = (par.room).toLowerCase();
    if(!userClass.userValid(par.name) || !isRealString(par.name) || !isRealString(lowerRoom)){
      return callback("Invalid params.");
    }
    socket.join(lowerRoom);
    userClass.removeUser(socket.id);
    userClass.addUser(socket.id, par.name, lowerRoom);
    io.to(lowerRoom).emit('updateUserList', userClass.getUserList(lowerRoom));

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(lowerRoom).emit('newMessage', generateMessage('Admin', `${par.name} has joined the chat`));
    callback();
  });

  socket.on('createMessage', (indiMsg, callback)=>{
    var user = userClass.getUser(socket.id);
    if (user && isRealString(indiMsg.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name,indiMsg.text));
    }
    callback();
  });

  socket.on('createLocMsg', (loc)=>{
    var user = userClass.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocMsg', generateLocMsg(user.name, loc.lat, loc.lng));
    }
  });

  socket.on('disconnect', ()=>{
    var user = userClass.removeUser(socket.id);
    if (user) {
      var uniq = userClass.removeUser(socket.id);
      console.log(userClass.getUserList(user.room));
      io.to(user.room).emit('updateUserList', userClass.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});//end ON CONNECTION

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
