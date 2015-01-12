//var express = require('express')
//var app = express();

//app.set('port', (process.env.PORT || 5000))
//app.use(express.static(__dirname + '/public'))

//app.get('/', function(request, response) {
//  response.send('Hello World!')
//})
//app.get('/prueba', function(request, response) {
//  response.send('Geeky Theory probando express.js en /prueba')
//})

//app.listen(app.get('port'), function() {
//  console.log("Node app is running at localhost:" + app.get('port'))
//})


//var express = require('express');
//var app = express();
//app.set('port', (process.env.PORT || 5000))
//app.get('/', function(req, res) { 
//	res.send('Geeky Theory probando express.js');
// }); 
//app.get('/prueba', function(req, res) { 
//	res.send('Geeky Theory probando express.js en /prueba'); 
//}); 
//app.listen(app.get('port'), function() {
//  console.log("Node app is running at localhost:" + app.get('port'))
//})



var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

console.log(process.env.PORT);
console.log(process.env.IP);
console.log(process.env.CLEARDB_DATABASE_URL);
emit=process.env.IP;

server.listen(process.env.PORT,process.env.IP);
//server.listen(5000);

app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    socket.on('sendMessage',function(data){
        io.sockets.emit('newMessage',{msg : emit});
    });
});