// routes/qr.js
const express = require('express');
const { startSocket } = require('../startSocket');
const router = express.Router();

module.exports = (io) => {
  router.get('/', async (req, res) => {
    try {
      await startSocket(io, null, 'qr');
      res.json({ status: 'QR session started' });
    } catch (err) {
      res.status(500).json({ error: 'QR session failed' });
    }
  });
  return router;
};
