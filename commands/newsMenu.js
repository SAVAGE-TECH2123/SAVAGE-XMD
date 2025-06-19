const axios = require('axios');

module.exports = {
  name: 'news',
  alias: ['newsmenu', 'footballnews', 'entertainmentnews', 'technews'],
  category: 'News',
  desc: 'Get latest football, entertainment, or tech news',

  async execute(m, { sock, args }) {
    await sock.sendPresenceUpdate('composing', m.chat);

    const NEWS_API_KEY = process.env.NEWS_API_KEY || '02bf040852ed4d3080d766b2b0f3602a';

    const category = (args[0] || '').toLowerCase();

    let newsCategory = '';
    let emoji = '';
    let title = '';

    if (category === 'entertainment') {
      newsCategory = 'entertainment';
      emoji = '🎬';
      title = '*Latest Entertainment News:*';
    } else if (category === 'tech' || category === 'technology') {
      newsCategory = 'technology';
      emoji = '💻';
      title = '*Latest Tech News:*';
    } else {
      // default to football
      newsCategory = 'sports';
      emoji = '⚽';
      title = '*Latest Football News:*';
    }

    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${newsCategory}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`
      );

      const articles = res.data.articles;

      if (!articles || articles.length === 0) {
        return sock.sendMessage(m.chat, { text: `${emoji} No news found for that category.` });
      }

      let message = `${emoji} ${title}\n\n`;
      articles.forEach((article, i) => {
        message += `*${i + 1}. ${article.title}*\n`;
        message += `🌐 ${article.url}\n\n`;
      });

      await sock.sendMessage(m.chat, { text: message.trim() });

    } catch (err) {
      console.error('Error fetching news:', err.message);
      await sock.sendMessage(m.chat, { text: '❌ Failed to fetch news. Please try again later.' });
    }
  }
};// Placeholder for newsMenu.js
