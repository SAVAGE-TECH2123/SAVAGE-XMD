require('dotenv').config();

module.exports = {
  // Server settings
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '0.0.0.0',

  // Session
  SESSION_NAME: process.env.SESSION_NAME || 'savage-xmd-session',
  MAX_CONNECTIONS: parseInt(process.env.MAX_CONNECTIONS) || 5,

  // Bot Info
  BOT_NAME: process.env.BOT_NAME || 'SAVAGE-XMD',
  DEVELOPER: process.env.DEVELOPER || 'SAVAGE_B.O.Y',
  PAIRING_NUMBERS: (process.env.PAIRING_NUMBERS || '255765457691').split(',').map(n => n.trim()),

  // API Keys
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  NEWS_API_KEY: process.env.NEWS_API_KEY || '',

  // Logger level
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};// Placeholder for config.js
