const { Router } = require('express');
const { logger } = require('../logger/logger');
const getArtist = require('../utils/lastfm-api-call');

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/artists', (req, res) => {
    const name = req.query.name;
    if (!name) {
        logger.info('Missing required query parameter: name');
        return res.status(400).send({ error: 'Missing required query parameter: name' });
    }
    artist = getArtist(name);
    artist.then((data) => {
        logger.info(`Successfully retrieved artist for name ${name}`);
        logger.debug(`Artist data for name ${name}: ${JSON.stringify(data)}`);
        return res.status(200).send(data);
    }).catch((error) => {
        logger.error(`Error getting artist for name ${name}: ${error.message}`);
        return res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;