<h1 align="center">🤖 SAVAGE-XMD WhatsApp Bot</h1>

<p align="center">
  <img src="https://files.catbox.moe/jqvqj2.jpeg" width="250" alt="SAVAGE-XMD Logo" />
</p>

<p align="center">
  <b>A powerful, multifunctional WhatsApp bot built on <code>Baileys</code> with pairing code support</b><br/>
  <i>Developed by SAVAGE_B.O.Y</i>
</p>

---

## 🔗 Live Session Scanner

👉 Start your bot session via pairing or QR code using our public scanner:  
**🌐 [SAVAGE-XMD SESSION SCANNER](https://savage-xmd-session-scanner.onrender.com/)**
**♠️  [https://session-scanner-hsov.onrender.com]
---

## 🚀 Features

- 💬 Chatbot / AI integration
- 🎮 Fun & Game commands
- 📥 Media Downloader (Videos, Music, Images)
- 📰 Football-focused News updates
- 🛡️ Group Moderation (antilink, antibot, admin-only)
- 🧠 Banned words auto-delete
- ⚙️ Admin commands panel
- 📡 Fully deployable on **Render**, no Termux needed

---

## 📁 File Structure

```bash
📦 SAVAGE-XMD/
┣ 📂 commands/         # Command modules (menus, banword, etc.)
┣ 📂 handlers/         # Message and event logic
┣ 📂 middleware/       # Banned words middleware
┣ 📂 public/           # Frontend (index.html for scanner UI)
┣ 📂 routes/           # Pairing/QR API routes
┣ 📂 utils/            # Logger & config helper
┣ 📄 bot.js            # Bot core logic
┣ 📄 server.js         # Express server entry
┣ 📄 startSocket.js    # WhatsApp socket initializer
┣ 📄 .env.example      # Environment config example
┣ 📄 package.json      # Dependencies
┣ 📄 README.md         # You are here!
