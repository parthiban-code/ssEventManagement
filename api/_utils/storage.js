const { sql } = require('@vercel/postgres');

async function initializeDB() {
  try {
    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        event_type TEXT NOT NULL,
        preferred_date TEXT NOT NULL,
        guest_count INTEGER NOT NULL,
        budget_range TEXT NOT NULL,
        location TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        token TEXT PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
  } catch (err) {
    console.error('DB initialization error:', err);
  }
}

async function getBookings() {
  try {
    const result = await sql`SELECT * FROM bookings ORDER BY created_at DESC`;
    return result.rows;
  } catch (err) {
    console.error('Get bookings error:', err);
    return [];
  }
}

async function saveBooking(booking) {
  try {
    await sql`
      INSERT INTO bookings (id, full_name, phone, email, event_type, preferred_date, guest_count, budget_range, location, message, status)
      VALUES (${booking.id}, ${booking.fullName}, ${booking.phone}, ${booking.email}, ${booking.eventType}, ${booking.preferredDate}, ${booking.guestCount}, ${booking.budgetRange}, ${booking.location}, ${booking.message}, ${booking.status})
    `;
  } catch (err) {
    console.error('Save booking error:', err);
    throw err;
  }
}

async function updateBooking(id, updates) {
  try {
    const result = await sql`
      UPDATE bookings 
      SET status = ${updates.status}
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  } catch (err) {
    console.error('Update booking error:', err);
    throw err;
  }
}

async function getSessions() {
  try {
    const result = await sql`SELECT * FROM admin_sessions`;
    return result.rows;
  } catch (err) {
    console.error('Get sessions error:', err);
    return [];
  }
}

async function saveSession(token) {
  try {
    await sql`INSERT INTO admin_sessions (token) VALUES (${token})`;
  } catch (err) {
    console.error('Save session error:', err);
    throw err;
  }
}

async function deleteSession(token) {
  try {
    await sql`DELETE FROM admin_sessions WHERE token = ${token}`;
  } catch (err) {
    console.error('Delete session error:', err);
    throw err;
  }
}

async function isValidSession(token) {
  try {
    const result = await sql`SELECT * FROM admin_sessions WHERE token = ${token}`;
    return result.rows.length > 0;
  } catch (err) {
    console.error('Validate session error:', err);
    return false;
  }
}

module.exports = {
  initializeDB,
  getBookings,
  saveBooking,
  updateBooking,
  getSessions,
  saveSession,
  deleteSession,
  isValidSession,
};
