const axios = require('axios');
const config = require('../config');

module.exports = {
  name: 'chat',
  alias: ['talk', 'converse'],
  category: 'Conversation Menu',
  desc: 'Chat casually with SAVAGE-XMD AI bot.',
  use: '$chat <message>',
  
  async execute(m, { args, sock }) {
    const query = args.join(' ');
    if (!query) {
      return m.reply('🗣️ Please say something to chat.\n\nExample: *$chat How are you today?*');
    }

    // Typing simulation
    await sock.sendPresenceUpdate('composing', m.chat);
    await m.reply(`🤖 SAVAGE-XMD is replying...\n\n${config.loadingBar || '⏳⏳⏳⏳'} Please wait...`);

    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
        temperature: 0.8,
      }, {
        headers: {
          'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const answer = res.data.choices[0].message.content.trim();
      return m.reply(`💬 *SAVAGE-XMD Chatbot:*\n\n${answer}`);
    } catch (e) {
      console.error(e);
      return m.reply('❌ Failed to get a response from the AI.\nMake sure your API key is working.');
    }
  }
};// Placeholder for conversationMenu.js
