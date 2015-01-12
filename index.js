var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

app.set('port', (process.env.PORT || 5000));
//app.set('ip', (process.env.IP || '127.0.0.1'));
app.set('database', (process.env.CLEARDB_DATABASE_URL || 'mysql://root:123456@localhost/heroku_cd1d6fb6d0a6d66?reconnect=true'));

var url = require('url');
var parsed = url.parse(app.get('database'));
auth = parsed.auth;
auth_split = auth.split(":"); 

/*
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : parsed.hostname,
  user     : auth_split['0'],
  password : auth_split['1']
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
  mysql = rows[0].solution;
});

connection.end();
*/
server.listen(app.get('port'));

app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    socket.on('sendMessage',function(data){
        io.sockets.emit('newMessage',{msg :  auth_split['0']});
    });
});