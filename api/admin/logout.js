const { deleteSession, isValidSession } = require('../_utils/storage');

function authMiddleware(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !isValidSession(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return token;
}

function handler(req, res) {
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
    const token = authMiddleware(req, res);
    if (!token) return;

    try {
      deleteSession(token);
      res.json({ message: 'Logged out' });
    } catch (err) {
      console.error('Logout error:', err);
      res.status(500).json({ error: 'Logout failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
