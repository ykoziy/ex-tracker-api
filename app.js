const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const db = require('./db');
const routes = require('./routes');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message})
  } else {
    res.status(err.status || 500).send({error: err.message});
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
