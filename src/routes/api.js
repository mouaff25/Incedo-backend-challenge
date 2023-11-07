const { Router } = require('express');
const { logger } = require('../logger/logger');
const getArtist = require('../utils/lastfm-api-call');
const writeToCsv = require('../file-management/csv');

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/artists', (req, res) => {
    const name = req.body.name;
    const csvFilename = req.body.csvFilename;
    if (!name) {
        logger.info('Missing required query parameter: name');
        return res.status(400).send({ error: 'Missing required query parameter: name' });
    }
    artist = getArtist(name);
    artist.then((data) => {
        logger.info(`Successfully retrieved artist for name ${name}`);
        logger.debug(`Artist data for name ${name}: ${JSON.stringify(data)}`);
        if (csvFilename) {
            writeToCsv(data, csvFilename).catch((error) => {
                logger.error(`Error writing artist data to csv file ${csvFilename}: ${error.message}`);
                return res.status(500).send({ error: "Internal Server Error" });
            }).then((resourceCreated) => {
                if (resourceCreated) {
                    return res.status(201).send(data);
                }
                return res.status(200).send(data);
            });
        }
    }).catch((error) => {
        logger.error(`Error getting artist for name ${name}: ${error.message}`);
        return res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;