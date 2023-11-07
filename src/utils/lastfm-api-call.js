const { logger } = require('../logger/logger');
const getUrl = require('../utils/api-url');
const http = require('http');
const { readFile } = require('fs').promises;

// load artists-fallback data
let artistsFallback = [];
readFile('./data/artists-fallback.json', 'utf8').then((data) => {
    artistsFallback = JSON.parse(data);
}).catch((error) => {
    logger.error(`Error loading artists-fallback.json: ${error.message}`);
});

function getArtist(name) {
    /**
     * This function returns the artist data for the artist name passed in.
     * 
     * @param {string} name - The name of the artist to search for
     * @returns {object} - An object containing the artist data
     * 
     * @example
     * 
     * const artist = getArtist('Michael Jackson');
     * 
     * console.log(artist); // { name: 'Michael Jackson', listeners: '123456', mbid: '123456', url: 'https://www.last.fm/music/Michael+Jackson' }
     * 
     */
    return new Promise((resolve, reject) => {
        if (!name) {
            logger.error('Missing required parameter: name');
            return reject({ error: 'Missing required parameter: name' });
        }
        try {
            ({ host, requestUrl } = getUrl(name));
        } catch (error) {
            logger.error(`Error getting URL for name "${name}": ${error.message}`);
            return reject({ error: error.message });
        }

        logger.debug(`Sending GET request to ${host} for name "${name}"`)
        http.get(requestUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                logger.debug(`Received data from ${host} GET request for name "${name}": ${chunk}`);
                data += chunk;
            });
            response.on('end', () => {
                if (response.statusCode !== 200) {
                    logger.error(`Error requesting ${host} GET request for name "${name}": ${data}`);
                    return reject({ error: data });
                }
                const apiResponse = JSON.parse(data);
                if (!apiResponse.results.artistmatches.artist.length) {
                    const artist = artistsFallback[0];
                    logger.warn(`No artist found for name "${name}", using fallback artist data: ${JSON.stringify(artist["name"])}`);
                    return resolve(artist);
                }
                const artist = apiResponse.results.artistmatches.artist[0];
                return resolve(artist);
            });
        }).on('error', (err) => {
            logger.error(`Error requesting ${host} GET request for name "${name}": ${err}`);
            return reject({ error: err });
        });
    });
}

module.exports = getArtist;