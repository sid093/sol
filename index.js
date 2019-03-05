const auth = require('./lib/auth');
const redis = require('./lib/redisHelper');
const express = require('express');

// Initialize Environment variables
require('dotenv').config();

// Initialize Application Contexts
let app = express();
redis.init();

app.use(express.json());
app.use(auth.init());
app.use('/', require('./api/_router')(auth, redis));

app.listen(3000);
