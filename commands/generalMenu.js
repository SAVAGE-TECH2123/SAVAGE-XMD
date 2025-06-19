const moment = require('moment');
const os = require('os');

module.exports = {
  name: 'general',
  alias: ['time', 'date', 'uptime', 'say'],
  category: 'General Menu',
  desc: 'General utilities like time, date, bot uptime, and repeat text',
  use: '$time | $date | $uptime | $say <text>',

  async execute(m, { sock, command, args }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    switch (command) {
      case 'time':
        const time = moment().format('HH:mm:ss');
        return m.reply(`🕒 Current Time: *${time}*`);

      case 'date':
        const date = moment().format('dddd, MMMM Do YYYY');
        return m.reply(`📅 Today is: *${date}*`);

      case 'uptime':
        const uptime = process.uptime();
        const format = (s) => {
          const h = Math.floor(s / 3600);
          const m = Math.floor((s % 3600) / 60);
          const sec = Math.floor(s % 60);
          return `${h}h ${m}m ${sec}s`;
        };
        return m.reply(`⚡ Bot Uptime: *${format(uptime)}*`);

      case 'say':
        if (!args.length) return m.reply('🗣️ Please provide text to say!\nExample: $say Hello world');
        const sayText = args.join(' ');
        return m.reply(`🗨️ ${sayText}`);

      default:
        return m.reply('📦 Use: $time | $date | $uptime | $say <text>');
    }
  }
};// Placeholder for generalMenu.js
