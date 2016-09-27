if (process.env.NODE_ENV !== 'production') {
	require('./config');
}

require('babel-core/register');

require.extensions['.css'] = () => { return; };

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const port = process.env.PORT || 3000;
const server = express();
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
	if (reason.stack) {
		console.error(reason.stack);
	} else {
		console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
	}
});

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
	res.writeHead(200, { 'Content-Type': 'image/x-icon' });
	res.end();
});

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use('/static', express.static(path.resolve(__dirname, 'static')));

if (!process.env.NODE_ENV) {
	const compiler = webpack(config);

	server.use(dev(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	}));
	server.use(hot(compiler));
}

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
	target: process.env.API_URL,
	// target: 'https://list-of-links-api.herokuapp.com',
	// target: 'https://api.listoflinks.co',
});

server.use('/api', (req, res) => {
	proxy.web(req, res);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
	if (error.code !== 'ECONNRESET') { console.error('proxy error', error); }
	if (!res.headersSent) { res.writeHead(500, { 'content-type': 'application/json' }); }
	res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }));
});

server.get('*', require('./app').serverMiddleware);

server.listen(port, (err) => {
	if (err) console.error(err);
	console.info(`⚡⚡⚡ Server running on http://localhost:${port}/`);
});
