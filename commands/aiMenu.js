// commands/aiMenu.js

const { default: axios } = require('axios');
const config = require('../config');

module.exports = {
  name: 'ai',
  alias: ['ai', 'ask', 'chatgpt'],
  category: 'AI Menu',
  desc: 'Ask the AI anything or generate responses!',
  use: '$ai <your question>',
  async execute(m, { args, sock, command }) {
    const query = args.join(' ');
    if (!query) return m.reply('🧠 Please enter a question.\n\nExample: *$ai Who is Albert Einstein?*');

    // Show loading message with typing simulation
    await sock.sendPresenceUpdate('composing', m.chat);
    await m.reply(`💬 SAVAGE-XMD is thinking...\n\n${config.loadingBar || '▰▰▰▱▱'} Please wait...`);

    try {
      const res = await axios.get(`https://api.openai.com/v1/chat/completions`, {
        headers: {
          Authorization: `Bearer ${config.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7,
        }
      });

      const answer = res.data.choices[0].message.content.trim();

      return m.reply(`🤖 *SAVAGE-XMD AI Response:*\n\n${answer}`);
    } catch (e) {
      console.error(e);
      return m.reply('❌ Failed to fetch response from AI API.\nMake sure your API key is valid.');
    }
  }
};// Placeholder for aiMenu.js
