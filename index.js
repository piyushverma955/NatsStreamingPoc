var express = require('express');
var app = express();
let client = require('./queue').stan; 
var logApiCall = logApiCalls('foo',client);
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.listen(3000);
app.use(bodyParser.urlencoded({ extended: true,inflate: true}));
app.use(bodyParser.json());
app.use(logApiCall);
var dbo = null;
var db = 'examples';
//global.stan = client;
MongoClient.connect(url)
.then(db=>{
	console.log('connected to db');
	 dbo = db.db("example");
})
    function abc(client){
	var opts = client.subscriptionOptions();
	opts.setDeliverAllAvailable();
	opts.setDurableName('my-durable');
	var subscription = client.subscribe('foo','foo.workers', opts);
	subscription.on('message', function (msg) {
	console.log('Received a message 22[' + msg.getSequence() + '] ' + msg.getData());})
	}

function logApiCalls(queue, client){
	return function (req, res, next) {
		let body = {
			url: req.originalUrl,
            method: req.method,
            reqBody: req.body,
        	resStatusCode: res.statusCode,
		};
		let bodyStr = JSON.stringify(body)
		
		client.publish(queue,  bodyStr);
		abc(client)
		next()
	  }	
}

app.get('/', function (req, res) {	
	dbo.collection("data").find({}).toArray()
	.then(result=>{
		res.send(result);
	}) 
	.catch((err)=>{
		console.log(err);
	})
})

app.get('/:name', function (req, res) {	
	let name  = req.params.name;
	dbo.collection("data").findOne({'name':name})
	.then(result=>{
		res.send(result);
	}) 
	.catch((err)=>{
		console.log(err);
	})
})

app.post('/',function (req, res) {	
	let body  = req.body;
	dbo.collection("data").insertOne(body)
	.then(result=>{
		res.send('data save successfully');
	}) 
	.catch((err)=>{
		console.log(err);
	})
})



