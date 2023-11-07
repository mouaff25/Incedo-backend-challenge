if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');
const { logger } = require('./src/logger/logger');
const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});