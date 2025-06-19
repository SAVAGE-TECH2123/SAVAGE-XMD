module.exports = {
  name: 'help',
  alias: ['menu', 'h'],
  category: 'General',
  desc: 'Show available commands and menus.',
  use: '$help [menu]',
  
  async execute(sock, m, args) {
    const prefix = '$';
    const menus = {
      main: `
🔰 *SAVAGE-XMD MAIN MENU* 🔰

👨‍💻 Developer: SAVAGE_B.O.Y
⚙️ Prefix: ${prefix}
📌 Use: ${prefix}help <menu>

Available Menus:
- ${prefix}help ai
- ${prefix}help general
- ${prefix}help group
- ${prefix}help download
- ${prefix}help fun
- ${prefix}help game
- ${prefix}help news
- ${prefix}help god
- ${prefix}help botinfo
- ${prefix}help conversation
      `.trim(),

      ai: `
🤖 *AI MENU*
${prefix}ask <question>
${prefix}img <prompt>
${prefix}code <language> <code>`.trim(),

      general: `
📚 *GENERAL MENU*
${prefix}ping
${prefix}help
${prefix}menu`.trim(),

      group: `
👥 *GROUP MENU*
${prefix}antilink on/off
${prefix}antibot on/off
${prefix}tagall
${prefix}kick @user
${prefix}promote @user
${prefix}demote @user
${prefix}group open/close`.trim(),

      download: `
⬇️ *DOWNLOAD MENU*
${prefix}ytmp3 <url>
${prefix}ytmp4 <url>
${prefix}play <song>
${prefix}image <query>
${prefix}apk <app name>`.trim(),

      fun: `
🎭 *FUN MENU*
${prefix}joke
${prefix}meme
${prefix}truth
${prefix}dare
${prefix}rate @user`.trim(),

      game: `
🎮 *GAME MENU*
${prefix}quiz
${prefix}guess
${prefix}rps
${prefix}tictactoe`.trim(),

      news: `
📰 *NEWS MENU*
${prefix}footballnews
${prefix}headlines
${prefix}technews`.trim(),

      god: `
🙏 *GOD IS FIRST MENU*
${prefix}bible verse
${prefix}pray
${prefix}jesus`.trim(),

      botinfo: `
📟 *BOT INFO MENU*
${prefix}bot
${prefix}status
${prefix}uptime`.trim(),

      conversation: `
💬 *CONVERSATION MENU*
${prefix}say <text>
${prefix}voice <text>
${prefix}quote`.trim()
    };

    const query = (args[0] || 'main').toLowerCase();
    const text = menus[query] || '❌ Invalid menu. Use: $help <menu>';

    await sock.sendMessage(m.key.remoteJid, { text }, { quoted: m });
  }
};
