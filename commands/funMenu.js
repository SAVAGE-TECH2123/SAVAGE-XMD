const axios = require('axios');

module.exports = {
  name: 'fun',
  alias: ['joke', 'meme', 'quote', 'truth', 'dare'],
  category: 'Fun Menu',
  desc: 'Fun commands like joke, meme, quote, truth, dare',
  use: '$joke | $meme | $quote | $truth | $dare',

  async execute(m, { sock, command }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    switch (command) {
      case 'joke':
        await m.reply('🎭 SAVAGE-XMD is thinking of a joke...');
        try {
          const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
          return m.reply(`🤣 ${res.data.setup}\n\n${res.data.punchline}`);
        } catch (e) {
          return m.reply('❌ Could not fetch a joke.');
        }

      case 'meme':
        await m.reply('🖼️ Fetching meme...');
        try {
          const meme = await axios.get('https://meme-api.com/gimme');
          return sock.sendMessage(m.chat, { image: { url: meme.data.url }, caption: `😂 ${meme.data.title}` }, { quoted: m });
        } catch (e) {
          return m.reply('❌ Could not load meme.');
        }

      case 'quote':
        await m.reply('💬 Getting a quote for you...');
        try {
          const res = await axios.get('https://api.quotable.io/random');
          return m.reply(`💡 "${res.data.content}"\n– ${res.data.author}`);
        } catch (e) {
          return m.reply('❌ Could not fetch quote.');
        }

      case 'truth':
        const truths = [
          'What is your biggest fear?',
          'Have you ever lied to your best friend?',
          'What is a secret you never told anyone?',
          'Do you have a crush right now?'
        ];
        return m.reply(`🧠 TRUTH:\n${truths[Math.floor(Math.random() * truths.length)]}`);

      case 'dare':
        const dares = [
          'Text your crush and say hi!',
          'Send a voice note singing a song.',
          'Change your profile picture to a funny photo.',
          'Eat something sour and record your reaction.'
        ];
        return m.reply(`🔥 DARE:\n${dares[Math.floor(Math.random() * dares.length)]}`);

      default:
        return m.reply('❓ Use: $joke | $meme | $quote | $truth | $dare');
    }
  }
};
