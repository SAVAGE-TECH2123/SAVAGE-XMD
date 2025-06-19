// routes/pairing.js
const express = require('express');
const { startSocket } = require('../startSocket');
const router = express.Router();

module.exports = (io) => {
  router.post('/', async (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: 'Missing number' });
    try {
      await startSocket(io, number, 'pairing');
      res.json({ status: 'Pairing code session started' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate pairing code' });
    }
  });
  return router;
};
