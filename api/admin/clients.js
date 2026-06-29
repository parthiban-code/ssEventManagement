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

      const bookings = await getBookings();
      const clientsMap = {};

      bookings.forEach(b => {
        if (!clientsMap[b.phone]) {
          clientsMap[b.phone] = {
            name: b.full_name,
            phone: b.phone,
            email: b.email,
            requestCount: 0,
            lastRequest: null,
            lastEventType: null,
          };
        }
        clientsMap[b.phone].requestCount += 1;
        const lastRequest = clientsMap[b.phone].lastRequest ? new Date(clientsMap[b.phone].lastRequest) : new Date(0);
        const thisRequest = new Date(b.created_at);
        if (thisRequest > lastRequest) {
          clientsMap[b.phone].lastRequest = b.created_at;
          clientsMap[b.phone].lastEventType = b.event_type;
        }
      });

      const clients = Object.values(clientsMap).sort((a, b) => {
        const aDate = new Date(a.lastRequest || 0);
        const bDate = new Date(b.lastRequest || 0);
        return bDate - aDate;
      });

      res.json(clients);
    } catch (err) {
      console.error('Clients error:', err);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
