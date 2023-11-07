const { logger } = require('../logger/logger');
const getUrl = require('../utils/api-url');
const http = require('http');


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
            logger.info('Missing required query parameter: name');
            return reject({ error: 'Missing required query parameter: name' });
        }
        try {
            ({ host, requestUrl } = getUrl(name));
        } catch (error) {
            logger.error(`Error getting URL for name ${name}: ${error.message}`);
            return reject({ error: error.message });
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
                    return reject({ error: data });
                }
                return resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            logger.error(`Error requesting ${host} GET request for name ${name}: ${err}`);
            return reject({ error: err });
        });
    });
}

module.exports = getArtist;