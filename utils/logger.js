// Placeholder for logger.js
const { createLogger, format, transports } = require('winston');
const config = require('./config');

const logger = createLogger({
  level: config.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;
