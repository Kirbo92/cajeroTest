var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

// Configuración
app.use(express.static('public'));

// Variables
var monedas = 0;


io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado con Sockets');
  monedas += 5;
  io.sockets.emit('recarga', {monedas: monedas})

  socket.on('disconnect', function() {
  	console.log('Alguien se ha desconectado');
    monedas -= 5;
  	io.sockets.emit('compra', {monedas: monedas});

  });
});

server.listen(8080, '192.168.1.45', function() {  
  console.log("Servidor corriendo en http://192.168.1.45:8080");
});