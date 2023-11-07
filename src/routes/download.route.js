const { Router } = require('express');
const { logger } = require('../logger/logger');
const checkExists = require('../file-management/exists');

const router = Router();

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    if (!filename) {
        logger.info('Missing required query parameter: filename');
        return res.status(400).send({ error: 'Missing required query parameter: filename' });
    }
    const path = `./data/csv-files/${filename}`;
    checkExists(path).then((exists) => {
        if (!exists) {
            logger.info(`File ${filename} does not exist`);
            return res.status(404).send({ error: `File ${filename} does not exist` });
        }
        logger.info(`File ${filename} exists`);
        try {
            res.download(path);
        }
        catch (error) {
            logger.error(`Error downloading file ${filename}: ${error.message}`);
            return res.status(500).send({ error: "Internal Server Error" });
        }
    });
});

module.exports = router;