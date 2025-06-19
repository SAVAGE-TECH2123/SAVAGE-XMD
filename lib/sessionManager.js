// lib/sessionManager.js

const fs = require('fs');
const path = require('path');

const sessionsDir = path.join(__dirname, '../sessions');

// Ensure the session folder exists
if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir);
}

/**
 * Save session data to a file.
 * @param {string} sessionId - The ID of the session (e.g. phone number).
 * @param {object} sessionData - The session data to save.
 */
function saveSession(sessionId, sessionData) {
    const filePath = path.join(sessionsDir, `${sessionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));
}

/**
 * Load session data from a file.
 * @param {string} sessionId - The ID of the session.
 * @returns {object|null} The loaded session data, or null if not found.
 */
function loadSession(sessionId) {
    const filePath = path.join(sessionsDir, `${sessionId}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

/**
 * Check if a session exists.
 * @param {string} sessionId - The ID of the session.
 * @returns {boolean}
 */
function sessionExists(sessionId) {
    const filePath = path.join(sessionsDir, `${sessionId}.json`);
    return fs.existsSync(filePath);
}

/**
 * Delete a session.
 * @param {string} sessionId
 */
function deleteSession(sessionId) {
    const filePath = path.join(sessionsDir, `${sessionId}.json`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

module.exports = {
    saveSession,
    loadSession,
    sessionExists,
    deleteSession,
    sessionsDir,
};// Placeholder for sessionManager.js
