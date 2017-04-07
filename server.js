'use strict'
var express=require('express'),
server = express(),
bodyParser = require('body-parser'),
engines = require('consolidate'),
path = require('path'),
SERVER_PORT=8986;

server.use(bodyParser.json());
server.use(express.static(__dirname));
server.set('views', __dirname );
server.engine('html', engines.mustache);
server.set('view engine', 'html');
server.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
server.listen(SERVER_PORT,function(){ });
console.log("Server listening on "+SERVER_PORT+" port...")

module.exports = server;