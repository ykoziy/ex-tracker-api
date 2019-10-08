const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const db = require('./db');
const routes = require('./routes');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).send(err.message);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));