const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var users= [];

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
  res.end("Server started successfully");
});

io.on('connection', socket => {
  socket.emit('user', {
    users:users
  });
  users.push(socket.id.slice(8));
  socket.broadcast.emit('user', {
    users:users
  });
  socket.on('disconnect', function(){
    users = users.filter((user)=>{
      return user!= socket.id.slice(8);
    });
    socket.broadcast.emit('user', {
      users:users
    });
  });
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body:body, 
      from:socket.id.slice(8)
    });
  });
});

server.listen(process.env.PORT || 8080);
