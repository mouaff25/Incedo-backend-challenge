const checkExists = require('./exists');
const { mkdir } = require('fs').promises;
const { logger } = require('../logger/logger');

function createDirectory(path) {
    /**
     * This function creates a directory if it does not exist.
     * 
     * @param {string} path - The path to the directory to create
     * @returns {undefined}
     * 
     * @example
     * 
     * createDirectory('./data/csv-files');
     * 
     * // ./data/csv-files directory created
     */
    checkExists(path).then((exists) => {
        if (!exists) {
            mkdir(path).then(() => {
                logger.info(`${path} directory created`);
            })
        }
    });
}

module.exports = createDirectory;
