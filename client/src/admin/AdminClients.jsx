import { useState, useEffect } from 'react';
import { getClients } from '../api/admin';

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Clients</h1>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Auto-generated from booking requests, grouped by phone number.
      </p>

      {loading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No clients yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Requests</th>
              <th>Last Event Type</th>
              <th>Last Request</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.phone}>
                <td><strong>{c.name}</strong></td>
                <td className="mono">{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.request_count}</td>
                <td>{c.last_event_type}</td>
                <td style={{ fontSize: '0.85rem' }}>{new Date(c.last_request).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
