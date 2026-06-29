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
      const token = authMiddleware(req, res);
      if (!token) return;

      const bookings = await getBookings();
      console.log('📊 Stats: Fetched', bookings.length, 'bookings');
      console.log('📊 First few bookings:', bookings.slice(0, 2));
      
      const pending = bookings.filter(b => b.status === 'pending').length;
      const confirmed = bookings.filter(b => b.status === 'approved').length;
      const uniqueClients = new Set(bookings.map(b => b.phone)).size;

      console.log('📊 Counts - Pending:', pending, 'Confirmed:', confirmed, 'Unique:', uniqueClients, 'Total:', bookings.length);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const upcoming = bookings
        .filter(b => b.status === 'approved' && new Date(b.preferredDate) >= today)
        .sort((a, b) => new Date(a.preferredDate) - new Date(b.preferredDate))
        .slice(0, 10);

      res.json({
        pending,
        confirmed,
        total: bookings.length,
        uniqueClients,
        upcoming,
      });
    } catch (err) {
      console.error('Stats error:', err);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
