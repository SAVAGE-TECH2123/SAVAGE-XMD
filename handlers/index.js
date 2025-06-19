// handlers/index.js

const messageHandler = require('./messageHandler');

module.exports = {
    handleIncomingMessage: async (sock, message) => {
        try {
            await messageHandler.processMessage(sock, message);
        } catch (err) {
            console.error('❌ Error handling message:', err);
        }
    }
};// Placeholder for index.js
