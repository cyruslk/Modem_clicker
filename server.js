var express = require('express');
var socket = require('socket.io');
const { spawn } = require('child_process');
// const child = spawn('minimodem', ["--rx", "60"]);



var app = express();


server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_COORDINATES', function(data){

      const dataToString = `${data.x.toString()}, ${data.x.toString()}`;
      var baudRate = "60"
      var child = spawn("minimodem", ["-t", `${baudRate}`]);
      child.stdin.write(dataToString);
      console.log(dataToString, "----–––");

      io.emit('RECEIVE_COORDINATES', data);

    })
});
