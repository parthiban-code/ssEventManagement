const { getBookings, initializeDB } = require('../_utils/storage');
const login = require('./login');

async function authMiddleware(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  const payload = login.verifyToken(token);
  if (!payload || payload.type !== 'admin') {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
  return token;
}

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      await initializeDB();
      if (!(await authMiddleware(req, res))) return;

      const { month, year } = req.query;
      const m = month || new Date().getMonth() + 1;
      const y = year || new Date().getFullYear();

      const startDate = new Date(y, m - 1, 1);
      const endMonth = m === 12 ? 1 : parseInt(m) + 1;
      const endYear = m === 12 ? parseInt(y) + 1 : y;
      const endDate = new Date(endYear, endMonth - 1, 1);

      const bookings = await getBookings();
      const events = bookings.filter(b => {
        const bDate = new Date(b.preferred_date);
        return b.status === 'approved' && bDate >= startDate && bDate < endDate;
      });

      res.json(events);
    } catch (err) {
      console.error('Calendar error:', err);
      res.status(500).json({ error: 'Failed to fetch calendar events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
