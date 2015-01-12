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

app.set('port', (process.env.PORT || 5000));
//app.set('ip', (process.env.IP || '127.0.0.1'));
app.set('database', (process.env.CLEARDB_DATABASE_UR || 'mysql://bb5dffb23f4faf:94b8c1b2@us-cdbr-iron-east-01.cleardb.net/heroku_cd1d6fb6d0a6d66?reconnect=true'));

var url = require('url');
var parsed = url.parse(app.get('database'));
console.log(parsed.hostname);


var mysql = require('mysql');/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();*/

server.listen(app.get('port'));

app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    socket.on('sendMessage',function(data){
        io.sockets.emit('newMessage',{msg : data});
    });
});