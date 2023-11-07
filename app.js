const express = require('express');
const { loggerMiddleware } = require('./src/logger/logger');
const apiRouter = require('./src/routes/api');
const downloadRouter = require('./src/routes/download');
const healthRouter = require('./src/routes/health');

const app = express();

app.use([express.json(), loggerMiddleware]);
app.use('/api/v1', apiRouter);
app.use('/download', downloadRouter);
app.use('/health', healthRouter);

module.exports = app;