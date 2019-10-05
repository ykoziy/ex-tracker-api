const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//app.use('/', routes);
/*
TODO:
  POST /api/exercise/new-user
  POST /api/exercise/add
  GET /api/exercise/log?{userId}[&from][&to][&limit]  where {} required, [] optional and from, to dates (yyyy-mm-dd), limit is a number
*/


app.listen(port, () => console.log(`App listening on port ${port}!`));