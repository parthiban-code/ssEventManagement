const crypto = require('crypto');
const { saveSession, initializeDB } = require('../_utils/storage');

const ADMIN_PIN = process.env.ADMIN_PIN || '1234';

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      await initializeDB();
      const { pin } = req.body;
      if (pin !== ADMIN_PIN) {
        return res.status(401).json({ error: 'Invalid PIN' });
      }
      const token = crypto.randomBytes(32).toString('hex');
      await saveSession(token);
      res.json({ token, warning: 'This is a prototype login. Replace with real authentication before going live.' });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
