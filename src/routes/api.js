const { Router } = require('express');
const http = require('http');
const { logger } = require('../logger/logger');
const getUrl = require('../utils/artists');


const router = Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/artists', (req, res) => {
    const name = req.query.name;
    if (!name) {
        logger.error('Missing required query parameter: name');
        return res.status(400).send({ error: 'Missing required query parameter: name' });
    }
    try {
        ({ host, requestUrl } = getUrl(name));
    } catch (error) {
        logger.error(`Error getting URL for name ${name}: ${error.message}`);
        return res.status(500).send({ error: error.message });
    }
    
    logger.debug(`Sending GET request to ${host} for name ${name}`)
    http.get(requestUrl, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            if (response.statusCode !== 200) {
                logger.error(`Error requesting ${host} GET request for name ${name}: ${data}`);
                return res.status(500).send({ error: data });
            }
            return res.status(200).send(JSON.parse(data));
        });
    }).on('error', (err) => {
        logger.error(`Error requesting ${host} GET request for name ${name}: ${err}`);
        return res.status(500).send({ error: err });
    });
});

module.exports = router;