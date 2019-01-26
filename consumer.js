var cluster_id =  'test-cluster';
var client_id =  'node-stan-pubs';
var server =  'nats://localhost:4222';
//let app = require('./index');
var e ={};
 
e.abc= (stan)=> {
var opts = stan.subscriptionOptions();
opts.setDeliverAllAvailable();
opts.setDurableName('my-durable');
var subscription = stan.subscribe('foo','foo.workers', opts);
subscription.on('message', function (msg) {
  console.log('Received a message 22[' + msg.getSequence() + '] ' + msg.getData());
});
}

module.exports = e;
