module.exports = {
    NATSConfig: {
		uri: process.env.NATS_HOST || 'nats://127.0.0.1:4222',
		/*user: process.env.NATS_USER || '',
		pass: process.env.NATS_PASS || '',
		maxReconnectAttempts: process.env.NATS_RECONN_ATTEMPTS || 500,
        reconnectTimeWait: process.env.NATS_RECONN_TIMEWAIT || 500,*/
        cluster_id:'test-cluster',
        client_id:'node-stan-pubs'
	}
}
