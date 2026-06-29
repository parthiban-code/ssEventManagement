let sql;

// Check if Vercel Postgres is available
if (process.env.POSTGRES_URL) {
  try {
    const postgres = require('@vercel/postgres');
    sql = postgres.sql;
    console.log('✓ Connected to Vercel Postgres');
  } catch (err) {
    console.error('Failed to load @vercel/postgres:', err);
  }
} else {
  console.warn('POSTGRES_URL not set - sessions will not persist across invocations');
}

// Fallback in-memory storage (won't persist across serverless invocations)
const bookingsData = [];
const sessionsData = {};

async function initializeDB() {
  if (!sql) return;
  
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
    console.log('✓ Database tables ready');
  } catch (err) {
    console.error('DB initialization error:', err);
  }
}

async function getBookings() {
  try {
    if (!sql) {
      console.warn('⚠️ Using fallback in-memory bookings storage (not persisted)', bookingsData.length, 'bookings');
      return bookingsData;
    }
    console.log('🔍 Querying database for bookings...');
    const result = await sql`SELECT * FROM bookings ORDER BY created_at DESC`;
    console.log('✅ Database query returned', result.rows.length, 'bookings');
    // Convert snake_case to camelCase for client
    return result.rows.map(row => ({
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
      createdAt: row.created_at
    }));
  } catch (err) {
    console.error('❌ Get bookings error:', err.message);
    console.warn('⚠️ Falling back to in-memory storage:', bookingsData.length, 'bookings');
    return bookingsData;
  }
}

async function saveBooking(booking) {
  try {
    if (!sql) {
      console.warn('⚠️ Saving to in-memory storage (not persisted):', booking.id);
      bookingsData.push(booking);
      return;
    }
    console.log('💾 Saving to database:', booking.id);
    await sql`
      INSERT INTO bookings (id, full_name, phone, email, event_type, preferred_date, guest_count, budget_range, location, message, status)
      VALUES (${booking.id}, ${booking.fullName}, ${booking.phone}, ${booking.email}, ${booking.eventType}, ${booking.preferredDate}, ${booking.guestCount}, ${booking.budgetRange}, ${booking.location}, ${booking.message}, ${booking.status})
    `;
    console.log('✅ Booking saved to database:', booking.id);
  } catch (err) {
    console.error('❌ Save booking error:', err.message);
    console.warn('⚠️ Falling back to in-memory storage:', booking.id);
    bookingsData.push(booking);
  }
}

async function updateBooking(id, updates) {
  try {
    if (!sql) {
      const index = bookingsData.findIndex(b => b.id === id);
      if (index !== -1) {
        bookingsData[index] = { ...bookingsData[index], ...updates };
        return bookingsData[index];
      }
      return null;
    }
    const result = await sql`
      UPDATE bookings 
      SET status = ${updates.status}
      WHERE id = ${id}
      RETURNING *
    `;
    const row = result.rows[0];
    if (!row) return null;
    // Convert snake_case to camelCase for client
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
      createdAt: row.created_at
    };
  } catch (err) {
    console.error('Update booking error:', err);
    const index = bookingsData.findIndex(b => b.id === id);
    if (index !== -1) {
      bookingsData[index] = { ...bookingsData[index], ...updates };
      return bookingsData[index];
    }
    return null;
  }
}

async function saveSession(token) {
  if (!sql) {
    console.error('❌ No database connection for sessions - login will not persist');
    sessionsData[token] = { createdAt: new Date().toISOString() };
    return;
  }
  
  try {
    await sql`INSERT INTO admin_sessions (token) VALUES (${token})`;
    console.log('✓ Session saved');
  } catch (err) {
    console.error('Save session error:', err);
    throw err;
  }
}

async function deleteSession(token) {
  if (!sql) {
    delete sessionsData[token];
    return;
  }
  
  try {
    await sql`DELETE FROM admin_sessions WHERE token = ${token}`;
  } catch (err) {
    console.error('Delete session error:', err);
  }
}

async function isValidSession(token) {
  if (!sql) {
    const valid = !!sessionsData[token];
    console.warn('Session check (fallback):', token.substring(0, 8) + '...', valid);
    return valid;
  }
  
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
  saveSession,
  deleteSession,
  isValidSession,
};
