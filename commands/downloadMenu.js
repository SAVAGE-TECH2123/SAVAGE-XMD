const axios = require('axios');

module.exports = {
  name: 'download',
  alias: ['get', 'fetch'],
  category: 'Download Menu',
  desc: 'Download music, video, app, or image by name.',
  use: '$download <query>',

  async execute(m, { args, sock }) {
    const query = args.join(' ');
    if (!query) return m.reply('🔍 Please provide what to download.\n\nExample: *$download Shape of You song*');

    await sock.sendPresenceUpdate('composing', m.chat);
    await m.reply(`📥 SAVAGE-XMD is searching...\n⏳ Please wait...`);

    try {
      const response = await axios.get(`https://api-xyz-example.com/download`, {
        params: { query },
        headers: {
          'Authorization': 'Bearer your_api_key_here' // replace with a valid key if needed
        }
      });

      const result = response.data;
      if (!result || !result.url) {
        return m.reply('❌ No results found. Try being more specific.');
      }

      const caption = `🎉 *Download Found!*\n\n📄 Title: ${result.title}\n📦 Type: ${result.type}\n🔗 URL: ${result.url}`;
      await sock.sendMessage(m.chat, { document: { url: result.url }, mimetype: result.mime || 'application/octet-stream', fileName: result.title || 'file' }, { quoted: m });
      return m.reply(caption);

    } catch (err) {
      console.error(err);
      return m.reply('❌ Failed to fetch download. Try again or check your internet/API.');
    }
  }
};
