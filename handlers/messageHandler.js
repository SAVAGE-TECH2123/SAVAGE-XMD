// handlers/messageHandler.js

const fs = require('fs');
const path = require('path');
const prefix = '$'; // Bot command prefix
const commandsPath = path.join(__dirname, '../commands');

// Load all commands from the commands folder
const commands = new Map();
fs.readdirSync(commandsPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const command = require(path.join(commandsPath, file));
        if (command.name) {
            commands.set(command.name, command);
        }
        // Also map aliases
        if (command.alias && Array.isArray(command.alias)) {
            command.alias.forEach(alias => commands.set(alias, command));
        }
    }
});

module.exports = {
    processMessage: async (sock, message) => {
        try {
            const from = message.key.remoteJid;
            const isGroup = from.endsWith('@g.us');
            const type = Object.keys(message.message || {})[0];
            const content = message.message[type];

            if (type !== 'conversation' && type !== 'extendedTextMessage') return;

            const body = type === 'conversation' ? content : content.text;
            if (!body.startsWith(prefix)) return;

            const args = body.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = commands.get(commandName);
            if (!command) return;

            await command.execute(message, args, sock, commandName);
        } catch (err) {
            console.error('❌ Error in message handler:', err);
        }
    }
};// Placeholder for messageHandler.js
