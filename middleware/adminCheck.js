module.exports = async (m, sock) => {
  const groupMetadata = await sock.groupMetadata(m.chat);
  const groupAdmins = groupMetadata.participants
    .filter(p => p.admin)
    .map(p => p.id);

  return groupAdmins.includes(m.sender);
};// Placeholder for adminCheck.js
