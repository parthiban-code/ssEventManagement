import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/admin';

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(pin);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>SS Event Management — Back Office</p>

        <div className="warning-banner">
          ⚠️ Prototype login only. Replace with real authentication before going live with customer data.
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="pin">Admin PIN</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Default PIN: 1234 (set ADMIN_PIN env var to change)
        </p>
      </div>
    </div>
  );
}
