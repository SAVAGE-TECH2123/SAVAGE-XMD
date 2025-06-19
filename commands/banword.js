const banWords = require('../middleware/banWords');

module.exports = {
  name: 'banword',
  alias: ['bw'],
  category: 'Moderation',
  desc: 'Add, remove or list banned words',
  use: '$banword <add|remove|list> [word]',
  async execute(m, { args }) {
    const action = args[0];
    const word = args[1];

    if (!action) return m.reply('❗ Usage:\n$banword add <word>\n$banword remove <word>\n$banword list');

    switch (action.toLowerCase()) {
      case 'add':
        if (!word) return m.reply('⚠️ Please provide a word to ban.');
        if (banWords.addWord(word)) {
          return m.reply(`✅ Banned the word: *${word}*`);
        } else {
          return m.reply(`⚠️ The word *${word}* is already banned.`);
        }

      case 'remove':
        if (!word) return m.reply('⚠️ Please provide a word to remove.');
        if (banWords.removeWord(word)) {
          return m.reply(`✅ Removed banned word: *${word}*`);
        } else {
          return m.reply(`⚠️ The word *${word}* was not found in the list.`);
        }

      case 'list':
        const list = banWords.getWords();
        if (!list.length) return m.reply('📭 No banned words set.');
        return m.reply(`🚫 *Banned Words List:*\n\n${list.map(w => `• ${w}`).join('\n')}`);
      
      default:
        return m.reply('❗ Unknown action. Use: add, remove, or list.');
    }
  }
};
