import { useState, useEffect } from 'react';
import { getStats } from '../api/admin';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Failed to load dashboard.</p>;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      <div className="warning-banner">
        ⚠️ This admin panel uses prototype authentication. Implement proper auth before production use.
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending Requests</p>
        </div>
        <div className="stat-card" style={{ borderColor: 'var(--teal)' }}>
          <h3>{stats.confirmed}</h3>
          <p>Confirmed Events</p>
        </div>
        <div className="stat-card" style={{ borderColor: 'var(--maroon)' }}>
          <h3>{stats.uniqueClients}</h3>
          <p>Unique Clients</p>
        </div>
        <div className="stat-card" style={{ borderColor: 'var(--navy)' }}>
          <h3>{stats.total}</h3>
          <p>All-Time Requests</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--navy)' }}>
        Upcoming Confirmed Events
      </h2>
      {stats.upcoming.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No upcoming confirmed events.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {stats.upcoming.map((b) => (
              <tr key={b.id}>
                <td className="mono" style={{ fontSize: '0.8rem' }}>{b.id}</td>
                <td>{b.fullName}</td>
                <td>{b.eventType}</td>
                <td>{b.preferredDate}</td>
                <td>{b.location}</td>
                <td>{b.guestCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
