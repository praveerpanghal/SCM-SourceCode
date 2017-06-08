'use strict'
var express = require('express'),
server = express(),
bodyParser = require('body-parser'),
engines = require('consolidate'),
path = require('path'),
jwt = require('jsonwebtoken'),
expressJwt = require('express-jwt'),
SERVER_PORT=82;

server.use(bodyParser.json());

/* authentication token code */
var secret = 'this is the secret secret secret 12356';

// We are going to protect /api routes with JWT
server.use('/api', expressJwt({secret: secret}));

var Client = require('node-rest-client').Client;
var client = new Client();
var request = require("request");

server.post('/authenticate', function (req, res) {

	//TODO validate req.body.username and req.body.password  
	var args = {
    	data: { user_email: req.body.user_email, password: req.body.password },
    	headers: { "Content-Type": "application/json" }
	};

	client.post("http://162.17.231.114:1212/ServiceSCM.svc/LoginDetails", args, 
		function (data, response) {
			var loginID = data[0];
			// invalid user details return error message
			if (!(loginID.ReturnVal==1)) {
				res.json({ token: loginID.ReturnVal, err_status:0});
				return;
			}
			//creating profile for token 
		    var profile = {
		    	returnVal: loginID.ReturnVal,
		    	userId: loginID.UserId
		  	};
		  	// We are sending the profile inside the token
		  	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
		  	res.json({ token: token });
		}
	);  
});
	
server.use(express.static(__dirname));
server.set('views', __dirname );
server.engine('html', engines.mustache);
server.set('view engine', 'html');
server.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/* upload image code start */
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Src/images/profile/')
    },
    filename: function (req, file, cb) {
    	//cb(null, file.originalname+ '-' + Date.now()+'.jpg')
		cb(null, file.originalname)
    }
});

var upload = multer({storage: storage});
server.post('/multer', upload.single('file'), function (req, res) {
	res.end("File uploaded successfully.");
});
/* upload image code end */

server.listen(SERVER_PORT,function(){ });
console.log("Server listening on "+SERVER_PORT+" port...");	
module.exports = server;