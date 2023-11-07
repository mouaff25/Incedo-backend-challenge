const csv = require('csv');
const fs = require('fs');
const checkFileExists = require('./exists');
const { logger } = require('../logger/logger');


function writeToCsv(artist, filename) {
    /**
     * This function writes the artist data to a csv file.
     * 
     * @param {object} artist - The artist data to write to the csv file
     * @param {string} filename - The name of the csv file to write to
     * @returns {undefined}
     * 
     * @example
     * 
     * const artist = {
     *    "name": "Michael Jackson",
     *    "listeners": "5014923",
     *    "mbid": "f27ec8db-af05-4f36-916e-3d57f91ecf5e",
     *    "url": "https://www.last.fm/music/Michael+Jackson",
     *    "streamable": "0",
     *    "image": [
     *        {
     *            "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
     *            "size": "small"
     *        },
     *        {
     *            "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
     *            "size": "medium"
     *        },
     *        {
     *            "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
     *            "size": "large"
     *        },
     *        {
     *            "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
     *            "size": "extralarge"
     *        },
     *        {
     *            "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
     *            "size": "mega"
     *        }
     *    ]
     * }
     * 
     * writeToCsv(artist, 'artists.csv');
     * 
     * // ./data/csv-files/artists.csv created with the following data:
     * // name,mbid,url,image_small,image
     */
    const name = artist.name;
    const mbid = artist.mbid;
    const url = artist.url;
    const images = artist.image;
    const image_small = images.find(image => image.size === 'small')['#text'];
    const image = images.find(image => image.size === 'medium')['#text'];
    const csvFileName = filename;
    const csvFilePath = `./data/csv-files/${csvFileName}`;
    const csvHeaders = ['name', 'mbid', 'url', 'image_small', 'image'];
    const csvData = [[name, mbid, url, image_small, image]];
    let options;

    checkFileExists(csvFilePath).then((fileExists) => {
        if (fileExists) {
            logger.info(`File ${csvFilePath} already exists. Appending data to file.`);
            options = { header: false };
            csv.stringify(csvData, options, (err, output) => {
                if (err) {
                    logger.error(`Error writing to csv file ${csvFilePath}: ${err.message}`);
                    throw err;
                }
                fs.appendFile(csvFilePath, output, (err) => {
                    if (err) {
                        logger.error(`Error writing to csv file ${csvFilePath}: ${err.message}`);
                        throw err;
                    }
                    logger.info(`Successfully wrote data to csv file ${csvFilePath}`);
                });
            });
        } else {
            logger.info(`File ${csvFilePath} does not exist. Creating file and writing data to file.`);
            options = { header: true, columns: csvHeaders };
            csv.stringify(csvData, options, (err, output) => {
                if (err) {
                    logger.error(`Error writing to csv file ${csvFilePath}: ${err.message}`);
                    throw err;
                }
                fs.appendFile(csvFilePath, output, (err) => {
                    if (err) {
                        logger.error(`Error writing to csv file ${csvFilePath}: ${err.message}`);
                        throw err;
                    }
                    logger.info(`Successfully wrote data to csv file ${csvFilePath}`);
                });
            });
        }
    }).catch((err) => {
        logger.error(`Error writing to csv file ${csvFilePath}: ${err.message}`);
        throw err;
    });
}

module.exports = writeToCsv;