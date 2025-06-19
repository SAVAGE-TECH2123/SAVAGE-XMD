// bot.js

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./utils/config');
const logger = require('./utils/logger');
const { exec } = require('child_process');
const { bannedWordsMiddleware } = require('./middleware/banwords');

// Setup
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('sessions');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    browser: ['SAVAGE-XMD', 'Chrome', '1.0.0'],
  });

  store.bind(sock.ev);

  // Connection Updates
  sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        logger.warn('Reconnecting...');
        startBot();
      } else {
        logger.error('Connection closed. You are logged out.');
      }
    } else if (connection === 'open') {
      logger.success('✅ SAVAGE-XMD is now connected!');
    }
  });

  // Save credentials
  sock.ev.on('creds.update', saveCreds);

  // Message Handler
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const sender = isGroup ? m.key.participant : m.key.remoteJid;
    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    const prefix = config.PREFIX || '$';

    // Banned word middleware
    await bannedWordsMiddleware(sock, m, body);

    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    const commandPath = path.join(__dirname, 'commands');
    const files = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const command = require(path.join(commandPath, file));
      if (
        command.name === commandName ||
        (command.alias && command.alias.includes(commandName))
      ) {
        // Admin check if group command
        if (command.groupOnly && isGroup) {
          const metadata = await sock.groupMetadata(m.key.remoteJid);
          const participants = metadata.participants;
          const senderInfo = participants.find(p => p.id === sender);
          if (!senderInfo?.admin && !senderInfo?.superadmin) {
            return sock.sendMessage(m.key.remoteJid, { text: '❌ Admins only can use this command.' }, { quoted: m });
          }
        }

        try {
          await command.execute(sock, m, args);
        } catch (err) {
          logger.error('Command error:', err);
        }
        break;
      }
    }
  });

  // Group Participants Update
  sock.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    for (const user of participants) {
      if (action === 'add') {
        await sock.sendMessage(id, { text: `👋 Welcome <@${user.split('@')[0]}>!`, mentions: [user] });
      } else if (action === 'remove') {
        await sock.sendMessage(id, { text: `👋 Goodbye @${user.split('@')[0]}`, mentions: [user] });
      }
    }
  });

  // Group Setting Changes
  sock.ev.on('groups.update', async (updates) => {
    for (const update of updates) {
      if (update.subject) {
        await sock.sendMessage(update.id, { text: `📢 Group name changed to: *${update.subject}*` });
      }
    }
  });
}

startBot();// Main bot logic
