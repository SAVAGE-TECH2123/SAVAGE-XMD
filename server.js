// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Load routes
const qrRoutes = require('./routes/qr');
const pairingRoutes = require('./routes/pairing');

app.use('/api/qr', qrRoutes(io));
app.use('/api/pairing', pairingRoutes(io));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
