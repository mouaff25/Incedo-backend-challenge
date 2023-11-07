const fs = require('fs');


function chechExists(path) {
    /**
     * This function checks if a file or directory exists.
     * 
     * @param {string} filePath - The path to the file to check
     * @returns {boolean} - True if the file exists, false otherwise
     * 
     */
    return fs.promises.access(path, fs.constants.F_OK).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = chechExists;