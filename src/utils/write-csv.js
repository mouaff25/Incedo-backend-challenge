const csv = require('csv');
const fs = require('fs');
const { logger } = require('../logger/logger');


function checkFileExists(filePath) {
    /**
     * This function checks if a file exists.
     * 
     * @param {string} filePath - The path to the file to check
     * @returns {boolean} - True if the file exists, false otherwise
     * 
     */
    return fs.promises.access(filePath, fs.constants.F_OK).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}

function writeToCsv(artist, filename) {
    /**
     * This function writes the artist data to a csv file.
     * 
     * @param {object} artist - The artist data to write to the csv file
     * @param {string} filename - The name of the csv file to write to
     * @returns {undefined}
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