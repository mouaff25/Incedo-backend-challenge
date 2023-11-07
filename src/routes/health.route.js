const { Router } = require('express');
const { logger } = require('../logger/logger');
const healthCheck = require('../utils/health');

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
    const health = healthCheck();
    if (health !== 'OK') {
        logger.error('Health check failed');
        return res.status(500).send({ error: 'Internal Server Error' });
    }
    logger.info('Health check successful');
    res.send(health);
});

module.exports = healthRouter;