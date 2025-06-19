module.exports = {
  name: 'game',
  alias: ['guess', 'riddle', 'flip', 'dice'],
  category: 'Game Menu',
  desc: 'Play mini games like guess, riddle, coin flip, dice roll',
  use: '$guess | $riddle | $flip | $dice',

  async execute(m, { sock, command }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    switch (command) {
      case 'guess':
        const number = Math.floor(Math.random() * 10) + 1;
        m.reply('🎯 I am thinking of a number between 1 and 10. Can you guess it? Reply with your number.');

        // Set a listener for response
        const filter = (msg) => msg.key.remoteJid === m.chat && !msg.key.fromMe;
        const collector = sock.ev.on('messages.upsert', async ({ messages }) => {
          const userMsg = messages[0];
          if (!filter(userMsg)) return;
          const userGuess = parseInt(userMsg.message?.conversation || '');
          if (userGuess === number) {
            sock.sendMessage(m.chat, { text: `🎉 Correct! I was thinking of ${number}` }, { quoted: userMsg });
          } else {
            sock.sendMessage(m.chat, { text: `❌ Nope! I was thinking of ${number}` }, { quoted: userMsg });
          }
          sock.ev.off('messages.upsert', collector);
        });
        break;

      case 'riddle':
        const riddles = [
          { q: "What has keys but can't open locks?", a: "A piano" },
          { q: "What can travel around the world while staying in one corner?", a: "A stamp" },
          { q: "What has hands but can’t clap?", a: "A clock" }
        ];
        const r = riddles[Math.floor(Math.random() * riddles.length)];
        m.reply(`🧩 RIDDLE: ${r.q}\n\n💭 Reply with your answer!`);

        const riddleCollector = sock.ev.on('messages.upsert', async ({ messages }) => {
          const userMsg = messages[0];
          if (!userMsg || userMsg.key.remoteJid !== m.chat) return;
          sock.sendMessage(m.chat, { text: `✅ Correct answer: ${r.a}` }, { quoted: userMsg });
          sock.ev.off('messages.upsert', riddleCollector);
        });
        break;

      case 'flip':
        const flip = Math.random() > 0.5 ? '🪙 Heads' : '🪙 Tails';
        return m.reply(`You flipped a coin...\nResult: ${flip}`);

      case 'dice':
        const dice = Math.floor(Math.random() * 6) + 1;
        return m.reply(`🎲 You rolled a dice...\nResult: ${dice}`);

      default:
        return m.reply('🎮 Use: $guess | $riddle | $flip | $dice');
    }
  }
};// Placeholder for gameMenu.js
