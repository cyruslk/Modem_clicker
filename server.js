var express = require('express');
var socket = require('socket.io');
const { spawn } = require('child_process');


var app = express();

server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});


io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_COORDINATES', function(data){
      const dataToString = `[${data.x.toString()}, ${data.y.toString()}]`;
      process.stdout.write(dataToString);
      io.emit('RECEIVE_COORDINATES', data);
    })
});
