const bannedWords = [];

module.exports = {
  name: 'groupmenu',
  alias: ['antilink', 'antibot', 'tagall', 'leave', 'joingroup', 'banword'],
  category: 'Group Menu',
  desc: 'Manage group settings like antilink, antibot, tagall, etc.',
  use: '$antilink <mode> | $antibot <mode> | $tagall | $leave | $joingroup <link> | $banword add/remove/list <word>',

  async execute(m, { sock, command, args, isGroupAdmin, isBotAdmin, isGroup }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    if (!isGroup) return m.reply('❌ This command only works in groups.');
    if (!isGroupAdmin) return m.reply('🔒 You need to be an *admin* to use this command.');

    const mode = args[0]?.toLowerCase();

    switch (command) {
      case 'antilink':
      case 'antibot':
        if (!['off', 'warn', 'remove', 'delete'].includes(mode))
          return m.reply(`❗ Usage: $${command} off | warn | remove | delete`);

        // Store mode in memory (use a DB for persistent storage)
        global[`${command}_mode_${m.chat}`] = mode;
        return m.reply(`✅ *${command.toUpperCase()}* has been set to *${mode.toUpperCase()}*`);

      case 'tagall':
        if (!isBotAdmin) return m.reply('🤖 I need to be *admin* to mention everyone.');
        const members = m.participants.map(p => `@${p.id.split('@')[0]}`).join('\n');
        return sock.sendMessage(m.chat, {
          text: `👥 Tagging all group members:\n\n${members}`,
          mentions: m.participants.map(p => p.id)
        });

      case 'leave':
        return m.reply('👋 Leaving group...').then(() => sock.groupLeave(m.chat));

      case 'joingroup':
        if (!args[0]) return m.reply('🔗 Provide a group invite link to join.\nExample: $joingroup https://chat.whatsapp.com/xxxxxx');
        try {
          const inviteCode = args[0].split('/')[3];
          await sock.groupAcceptInvite(inviteCode);
          return m.reply('✅ Successfully joined the group!');
        } catch (err) {
          return m.reply('❌ Failed to join group. Make sure the link is correct and I’m allowed.');
        }

      case 'banword':
        const subCmd = args[0];
        const word = args.slice(1).join(' ').toLowerCase();

        if (subCmd === 'add') {
          if (!word) return m.reply('❗ Provide a word to ban.\nExample: $banword add idiot');
          if (bannedWords.includes(word)) return m.reply('⚠️ Word is already banned.');
          bannedWords.push(word);
          return m.reply(`✅ Banned word: *${word}*`);

        } else if (subCmd === 'remove') {
          const index = bannedWords.indexOf(word);
          if (index === -1) return m.reply('❗ Word not found in banned list.');
          bannedWords.splice(index, 1);
          return m.reply(`✅ Removed banned word: *${word}*`);

        } else if (subCmd === 'list') {
          return m.reply(`🛑 Banned Words:\n\n${bannedWords.map(w => `• ${w}`).join('\n') || 'No banned words set.'}`);
        } else {
          return m.reply('❗ Usage:\n$banword add <word>\n$banword remove <word>\n$banword list');
        }

      default:
        return m.reply('📘 Group Commands:\n$antilink <mode>\n$antibot <mode>\n$tagall\n$leave\n$joingroup <link>\n$banword add/remove/list <word>');
    }
  }
};// Placeholder for groupMenu.js
