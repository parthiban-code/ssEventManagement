const { getBookings, updateBooking, initializeDB } = require('../_utils/storage');
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await initializeDB();
  } catch (err) {
    console.error('DB init error:', err);
  }

  if (!(await authMiddleware(req, res))) return;

  if (req.method === 'GET') {
    try {
      const bookings = await getBookings();
      res.json(bookings);
    } catch (err) {
      console.error('Get bookings error:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const { status } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Booking ID required' });
      }

      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const updated = await updateBooking(id, { status });
      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(updated);
    } catch (err) {
      console.error('Update booking error:', err);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
