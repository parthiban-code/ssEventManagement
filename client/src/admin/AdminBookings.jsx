import { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus } from '../api/admin';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    getBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="admin-header">
        <h1>Bookings Inbox</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No bookings found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="mono" style={{ fontSize: '0.75rem' }}>{b.id}</td>
                  <td>
                    <strong>{b.fullName}</strong>
                    <br />
                    <small style={{ color: 'var(--text-muted)' }}>{b.email}</small>
                  </td>
                  <td>{b.phone}</td>
                  <td>{b.eventType}</td>
                  <td>{b.preferredDate}</td>
                  <td>{b.guestCount}</td>
                  <td style={{ fontSize: '0.8rem' }}>{b.budgetRange}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="action-btns">
                      {b.status !== 'approved' && (
                        <button className="btn btn-success btn-sm" onClick={() => handleStatus(b.id, 'approved')}>
                          Approve
                        </button>
                      )}
                      {b.status !== 'rejected' && (
                        <button className="btn btn-danger btn-sm" onClick={() => handleStatus(b.id, 'rejected')}>
                          Reject
                        </button>
                      )}
                      {b.status !== 'pending' && (
                        <button className="btn btn-outline btn-sm" onClick={() => handleStatus(b.id, 'pending')}>
                          Reset
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
