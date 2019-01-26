var cluster_id =  'test-cluster';
var client_id =  'node-stan-pubs_' + ((Math.random() * 100));
var server =  'nats://localhost:4223';
var config = require('./config').NATSConfig;
var stan = require('node-nats-streaming').connect(config.cluster_id,config.client_id,config);
var consumer = require('./consumer');

stan.on('error', function(err) {
	console.log('helo',err);
});
 
stan.on('connect', function() {
	console.log('NATS connected');
	global.stan= stan;
	//consumer.abc(stan);
});
 
stan.on('disconnect', function() {

	console.log('NATS disconnect');
});
 
stan.on('reconnecting', function() {
	console.log('NATS reconnecting');
});
 
stan.on('reconnect', function() {
	console.log('NATS reconnect');
});
 
stan.on('close', function() {
	console.log('NATS close');
});

module.exports = {
	stan: stan
};
