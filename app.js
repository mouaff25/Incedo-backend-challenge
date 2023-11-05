const express = require('express');
const { loggerMiddleware } = require('./src/logger/logger');
const apiRouter = require('./src/routes/api');


const app = express();

app.use([express.json(), loggerMiddleware]);
app.use('/api/v1', apiRouter);

module.exports = app;