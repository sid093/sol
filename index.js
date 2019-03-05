const auth = require('./lib/auth');
const express = require('express');

// Initialize Environment variables
require('dotenv').config();

let app = express();

app.use(auth.init());

app.get('/', auth.protect('basic'), function (req, res) {
  res.send('Hello World')
})

app.listen(3000);
