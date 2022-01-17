const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile('C:/Users/KrishnamoorthyBavanu/Documents/personal/workspace/nodejs/index.html');
});

io.on('connection', (socket) => {
  socket.on('join', function (data) {
    console.log('join mail->', data.email);
    socket.join(data.email); // We are using room of socket io
  });

  socket.on('chatMsg', (data) => {
    console.log('message: ' + JSON.stringify(data));
    // Broad cast message to everyone
    // io.emit('chatMsg', msg);

    // Broad cast message everyone except sender
    // socket.broadcast.emit(msgInfo);

    // Send msg to a specific user or group
    socket.in(data.to).emit('chatMsg',data);
  });
});

server.listen(3000, () => {
  console.log('listening on -> 3000');
});