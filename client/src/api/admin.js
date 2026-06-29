const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

export function setToken(token) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated() {
  return !!getToken();
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearToken();
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function login(pin) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setToken(data.token);
  return data;
}

export async function logout() {
  try {
    await adminFetch('/admin/logout', { method: 'POST' });
  } catch {
    // ignore
  }
  clearToken();
}

export async function getStats() {
  return adminFetch('/admin/stats');
}

export async function getBookings() {
  return adminFetch('/admin/bookings');
}

export async function updateBookingStatus(id, status) {
  return adminFetch(`/admin/bookings?id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function getCalendarEvents(month, year) {
  return adminFetch(`/admin/calendar?month=${month}&year=${year}`);
}

export async function getClients() {
  return adminFetch('/admin/clients');
}
