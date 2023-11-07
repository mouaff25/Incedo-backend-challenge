if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');
const { logger } = require('./src/logger/logger');
const port = process.env.PORT || 5000;

const createDirectory = require('./src/file-management/create-directory');
createDirectory('./data/csv-files');

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});