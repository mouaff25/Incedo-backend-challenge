const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

let logLevel = (process.env.LOG_LEVEL || 'info');

let validLogLevel = true;
if (!(logLevel in winston.config.npm.levels)) {
    logLevel = 'info';
    validLogLevel = false;
}

const logger = winston.createLogger({
    level: logLevel,
    format: combine(
        label({ label: 'app' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File({ filename: './logs/app.log' })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(winston.format.simple(), colorize({ all: true }))
    }));
}

const loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};

if (validLogLevel) {
    logger.info(`Log level set to ${logLevel}`);
}
else {
    logger.warn("Invalid log level set. Defaulting to 'info'");
}

module.exports = { logger, loggerMiddleware };