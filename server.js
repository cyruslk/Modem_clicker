var express = require('express');
var socket = require('socket.io');

var app = express();


server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id, "this");

    socket.on('SEND_COORDINATES', function(data){
        console.log(data, "is this coming?");
        io.emit('RECEIVE_COORDINATES', data);
    })
});
