const { Router } = require('express');
const http = require('http');
const url = require('url');
const { logger } = require('../logger/logger');


const router = Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/artists', (req, res) => {
    const lastFmAPIKey = process.env.LASTFM_API_KEY;
    if (!lastFmAPIKey) {
        logger.error('LASTFM_API_KEY not set');
        return res.status(500).send({ error: 'LASTFM_API_KEY not set' });
    }
    const name = req.query.name;
    const host = 'ws.audioscrobbler.com';
    if (!name) {
        logger.error('Missing required query parameter: name');
        return res.status(400).send({ error: 'Missing required query parameter: name' });
    }
    const requestUrl = url.format({
        protocol: 'http',
        host: host,
        pathname: '',
        query: {
            method: 'artist.search',
            artist: name,
            api_key: process.env.LASTFM_API_KEY,
            format: 'json'
        }
    });
    logger.debug(`Sending GET request to ${host} for name ${name}`)
    http.get(requestUrl, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            return res.status(200).send(JSON.parse(data));
        });
    }).on('error', (err) => {
        logger.error(`Error requesting ${host} GET request for name ${name}: ${err}`);
        return res.status(500).send({ error: err });
    });
});

module.exports = router;