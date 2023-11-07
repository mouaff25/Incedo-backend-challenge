const { Router } = require('express');
const { logger } = require('../logger/logger');

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
    logger.info('Health check successful');
    res.send('OK');
});

module.exports = healthRouter;