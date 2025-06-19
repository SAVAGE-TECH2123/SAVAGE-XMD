const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../media/bannedWords.json');

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

function getWords() {
  return JSON.parse(fs.readFileSync(filePath));
}

function addWord(word) {
  const words = getWords();
  if (!words.includes(word)) {
    words.push(word);
    fs.writeFileSync(filePath, JSON.stringify(words, null, 2));
    return true;
  }
  return false;
}

function removeWord(word) {
  const words = getWords();
  const filtered = words.filter(w => w !== word);
  if (filtered.length !== words.length) {
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}

function checkMessage(message) {
  const words = getWords();
  const lower = message.toLowerCase();
  return words.some(w => lower.includes(w));
}

module.exports = {
  getWords,
  addWord,
  removeWord,
  checkMessage
};// Placeholder for banWords.js
