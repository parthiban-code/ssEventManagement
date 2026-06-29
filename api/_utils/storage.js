const fs = require('fs');
const path = require('path');

// Use /tmp for Vercel (ephemeral storage) or local data dir for development
const isVercel = !!process.env.VERCEL;
const storageDir = isVercel ? '/tmp' : path.join(__dirname, '../../server/data');

if (!isVercel && !fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

const bookingsFile = path.join(storageDir, 'bookings.json');
const sessionsFile = path.join(storageDir, 'sessions.json');

function ensureFiles() {
  if (!fs.existsSync(bookingsFile)) {
    fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(sessionsFile)) {
    fs.writeFileSync(sessionsFile, JSON.stringify({}, null, 2));
  }
}

function getBookings() {
  ensureFiles();
  const data = fs.readFileSync(bookingsFile, 'utf-8');
  return JSON.parse(data);
}

function saveBooking(booking) {
  ensureFiles();
  const bookings = getBookings();
  bookings.push(booking);
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
}

function updateBooking(id, updates) {
  ensureFiles();
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates };
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  return bookings[index];
}

function getSessions() {
  ensureFiles();
  const data = fs.readFileSync(sessionsFile, 'utf-8');
  return JSON.parse(data);
}

function saveSession(token) {
  ensureFiles();
  const sessions = getSessions();
  sessions[token] = { createdAt: new Date().toISOString() };
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
}

function deleteSession(token) {
  ensureFiles();
  const sessions = getSessions();
  delete sessions[token];
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
}

function isValidSession(token) {
  ensureFiles();
  const sessions = getSessions();
  return !!sessions[token];
}

module.exports = {
  getBookings,
  saveBooking,
  updateBooking,
  getSessions,
  saveSession,
  deleteSession,
  isValidSession,
};
