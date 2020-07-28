var express = require('express');
var app = express();
var server = require('http').createServer(app);
var connections= [];
var users = [];

app.use(express.static('./public'));

var port = process.env.PORT || 3000;

io=require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

	socket.on('messageAdded',function(payload){
		var newMessage = {
			timeStamp : payload.timestamp,
			text: payload.text
		}
		io.emit('messageAdded', newMessage);
	});

	connections.push(socket);
	console.log("Connected: %s sockets Connected", connections.length);
})

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});