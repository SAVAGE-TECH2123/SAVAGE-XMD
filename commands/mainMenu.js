const os = require('os');

module.exports = {
  name: 'mainmenu',
  alias: ['menu', 'help'],
  category: 'Main',
  desc: 'Show main bot menu',

  async execute(m, { sock, command, args }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    // Simulated typing delay
    const loadingBar = '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛';
    await sock.sendMessage(m.chat, { text: '⌛ Loading SAVAGE-XMD Menu...' });
    for (let i = 1; i <= 10; i++) {
      await new Promise(res => setTimeout(res, 100));
      await sock.sendMessage(m.chat, { text: loadingBar.slice(0, i) + '⬜'.repeat(10 - i), edit: m.key });
    }

    // System Info
    const platform = os.platform();
    const uptime = (os.uptime() / 3600).toFixed(2);
    const ping = Date.now() - m.messageTimestamp * 1000;

    const menuText = `
╭━━❖ 𝐒𝐀𝐕𝐀𝐆𝐄-𝐗𝐌𝐃 ❖━━╮
┃ 🤖 Prefix:  $
┃ 👤 Developer: SAVAGE_B.O.Y
┃ 📞 Contact: +255765457691
┃ 🧠 Status: Active
┃ ⏱️ Uptime: ${uptime} hrs
┃ 📡 Ping: ${ping}ms
┃ 🖥 Platform: ${platform}
╰━━━━━━━━━━━━━━━━━━╯

📚 *MAIN MENU* 📚
$developer
$deployer
$ping
$menu
$help

📦 Other Menus:
$ai menu – AI commands
$group menu – Admin & group tools
$general menu – Utilities & tools
$fun menu – Jokes, fun stuff
$download menu – Movies, songs, apps
$news menu – Football updates
$conservation menu – Archive
$game menu – Mini games

💡 Tip: Use *$help <command>* for detailed usage.
    `.trim();

    await sock.sendMessage(m.chat, { text: menuText });
  }
};// Placeholder for mainMenu.js
