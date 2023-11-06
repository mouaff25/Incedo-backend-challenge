const url = require('url');
const { logger } = require('../logger/logger');

function getUrl(name) {
    /**
    * This function returns the host and requestUrl for the Last.fm API
    * based on the artist name passed in.
    * 
    * @param {string} name - The name of the artist to search for
    * @returns {object} - An object containing the host and requestUrl
    * 
    * @example
    * 
    * const { host, requestUrl } = getUrl('Michael Jackson');
    * 
    * console.log(host); // ws.audioscrobbler.com/2.0/
    * console.log(requestUrl); // http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Michael%20Jackson&api_key=LASTFM_API_KEY&format=json
    * 
    */
    const lastFmAPIKey = process.env.LASTFM_API_KEY;
    if (!lastFmAPIKey) {
        throw new Error('Missing required environment variable: LASTFM_API_KEY');
    }

    const host = 'ws.audioscrobbler.com/2.0/';

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
    return { host, requestUrl };
}

module.exports = getUrl;
