const routes = require('express').Router();
const api = require('./api');
const main = require('./main');

routes.use('/', main);
routes.use('/api', api);

module.exports = routes;
