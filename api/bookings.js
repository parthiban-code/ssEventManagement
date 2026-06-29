const { saveBooking, getBookings, initializeDB } = require('./_utils/storage');

function generateBookingId() {
  const date = new Date();
  const prefix = `SSE-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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

  if (req.method === 'POST') {
    try {
      const { fullName, phone, email, eventType, preferredDate, guestCount, budgetRange, location, message } = req.body;

      if (!fullName || !phone || !email || !eventType || !preferredDate || !guestCount || !budgetRange || !location) {
        return res.status(400).json({ error: 'All required fields must be filled' });
      }

      const id = generateBookingId();
      const booking = {
        id,
        fullName,
        phone,
        email,
        eventType,
        preferredDate,
        guestCount: parseInt(guestCount),
        budgetRange,
        location,
        message: message || '',
        status: 'pending',
      };

      await saveBooking(booking);
      console.log('✅ Booking saved:', id);
      res.status(201).json({ id, message: 'Booking request submitted successfully' });
    } catch (err) {
      console.error('Booking error:', err);
      res.status(500).json({ error: err.message || 'Failed to submit booking' });
    }
  } else if (req.method === 'GET') {
    try {
      const bookings = await getBookings();
      res.json(bookings);
    } catch (err) {
      console.error('Get bookings error:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = handler;
