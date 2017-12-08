'use strict';
const url = require('url');
const qs = require('qs');

function register(server) {
	server.ext('onRequest', onRequest);
}

function onRequest(request, h) {
	const uri = request.url.href;
	const parsed = url.parse(uri, false);
	parsed.query = qs.parse(parsed.query);
	request.setUrl(parsed);

	return h.continue;
}


module.exports = {
	register,
	name: 'hapi-qs'
};
