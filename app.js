const express = require('express');
const { loggerMiddleware } = require('./src/logger/logger');
const apiRouter = require('./src/routes/api.route');
const downloadRouter = require('./src/routes/download.route');
const healthRouter = require('./src/routes/health.route');

const app = express();

app.use([express.json(), loggerMiddleware]);
app.use('/api/v1', apiRouter);
app.use('/download', downloadRouter);
app.use('/health', healthRouter);

module.exports = app;