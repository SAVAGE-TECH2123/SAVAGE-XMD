// startSocket.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const startSocket = async (io, number = null, mode = 'qr') => {
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: number || 'session' }),
    puppeteer: { headless: true }
  });

  client.on('qr', async (qr) => {
    const qrImage = await qrcode.toDataURL(qr);
    io.emit('qr', { src: qrImage, mode });
  });

  client.on('ready', () => {
    io.emit('ready', { message: 'WhatsApp is ready!' });
  });

  client.initialize();
};

module.exports = { startSocket };
