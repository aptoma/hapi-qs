'use strict';
const Hapi = require('hapi');
const qs = require('qs');
const expect = require('chai').expect;
const plugin = require('..');

describe('Hapi QS', () => {

	it('parses the query string', async () => {
		const server = new Hapi.Server();
		await server.register({plugin});

		server.route({
			method: 'GET',
			path: '/test',
			handler(req) {
				return req.query;
			}
		});

		const params = {
			foo: {
				bar: {
					monkey: 'banana'
				}
			},
			coolio: ['1', '2', '3']
		};

		const res = await server.inject({url: `/test?${qs.stringify(params)}`});
		expect(res.result).to.deep.equal(params);
	});

});
