const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Simple admin PIN — MUST be replaced before production
const ADMIN_PIN = process.env.ADMIN_PIN || '1234';

app.use(cors());
app.use(express.json());

function generateBookingId() {
  const date = new Date();
  const prefix = `SSE-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const session = db.prepare('SELECT * FROM admin_sessions WHERE token = ?').get(token);
  if (!session) return res.status(401).json({ error: 'Invalid session' });
  next();
}

// --- Public API ---

app.post('/api/bookings', (req, res) => {
  try {
    const { fullName, phone, email, eventType, preferredDate, guestCount, budgetRange, location, message } = req.body;

    if (!fullName || !phone || !email || !eventType || !preferredDate || !guestCount || !budgetRange || !location) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const id = generateBookingId();
    db.prepare(`
      INSERT INTO bookings (id, full_name, phone, email, event_type, preferred_date, guest_count, budget_range, location, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(id, fullName, phone, email, eventType, preferredDate, parseInt(guestCount), budgetRange, location, message || '');

    res.status(201).json({ id, message: 'Booking request submitted successfully' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: err.message || 'Failed to submit booking' });
  }
});

// --- Admin Auth ---

app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  if (pin !== ADMIN_PIN) {
    return res.status(401).json({ error: 'Invalid PIN' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO admin_sessions (token) VALUES (?)').run(token);
  res.json({ token, warning: 'This is a prototype login. Replace with real authentication before going live.' });
});

app.post('/api/admin/logout', authMiddleware, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  res.json({ message: 'Logged out' });
});

// --- Admin API ---

app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const pending = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get().count;
  const confirmed = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'approved'").get().count;
  const total = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
  const uniqueClients = db.prepare('SELECT COUNT(DISTINCT phone) as count FROM bookings').get().count;

  const upcoming = db.prepare(`
    SELECT * FROM bookings 
    WHERE status = 'approved' AND preferred_date >= date('now')
    ORDER BY preferred_date ASC
    LIMIT 10
  `).all();

  res.json({ pending, confirmed, total, uniqueClients, upcoming: upcoming.map(formatBooking) });
});

app.get('/api/admin/bookings', authMiddleware, (req, res) => {
  const bookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
  res.json(bookings.map(formatBooking));
});

app.patch('/api/admin/bookings/:id/status', authMiddleware, (req, res) => {
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const result = db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Booking not found' });
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id);
  res.json(formatBooking(booking));
});

app.get('/api/admin/calendar', authMiddleware, (req, res) => {
  const { month, year } = req.query;
  const m = month || new Date().getMonth() + 1;
  const y = year || new Date().getFullYear();
  const startDate = `${y}-${String(m).padStart(2, '0')}-01`;
  const endMonth = m === 12 ? 1 : parseInt(m) + 1;
  const endYear = m === 12 ? parseInt(y) + 1 : y;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

  const events = db.prepare(`
    SELECT * FROM bookings 
    WHERE status = 'approved' AND preferred_date >= ? AND preferred_date < ?
    ORDER BY preferred_date ASC
  `).all(startDate, endDate);

  res.json(events.map(formatBooking));
});

app.get('/api/admin/clients', authMiddleware, (req, res) => {
  const clients = db.prepare(`
    SELECT 
      full_name as name,
      phone,
      email,
      COUNT(*) as request_count,
      MAX(created_at) as last_request,
      (SELECT event_type FROM bookings b2 WHERE b2.phone = b.phone ORDER BY created_at DESC LIMIT 1) as last_event_type
    FROM bookings b
    GROUP BY phone
    ORDER BY last_request DESC
  `).all();
  res.json(clients);
});

function formatBooking(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    eventType: row.event_type,
    preferredDate: row.preferred_date,
    guestCount: row.guest_count,
    budgetRange: row.budget_range,
    location: row.location,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

// Serve static files in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// Handle unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve SPA fallback for non-API routes
if (fs.existsSync(clientDist)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`SS Event Management server running on http://localhost:${PORT}`);
  console.log(`Admin PIN: ${ADMIN_PIN} (set ADMIN_PIN env var to change)`);
});
