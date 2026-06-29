import { useState } from 'react';
import { EVENT_TYPES, BUDGET_RANGES } from '../data/content';
import './Booking.css';

export default function Booking() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: '',
    preferredDate: '',
    guestCount: '',
    budgetRange: '',
    location: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setConfirmation(data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <div className="booking-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">✓</div>
          <h1>Request Submitted!</h1>
          <p>Thank you for choosing SS Event Management.</p>
          <div className="booking-id-box">
            <span>Your Booking ID</span>
            <strong className="mono">{confirmation}</strong>
          </div>
          <p className="confirmation-note">
            Our team will call you back within <strong>24 hours</strong> to discuss your event details.
            Please save your booking ID for reference.
          </p>
          <p className="confirmation-payment">
            No payment is required now. Payment will be collected offline after your booking is confirmed by phone.
          </p>
          <button className="btn btn-primary" onClick={() => { setConfirmation(null); setForm({ fullName: '', phone: '', email: '', eventType: '', preferredDate: '', guestCount: '', budgetRange: '', location: '', message: '' }); }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Request a Booking</h1>
          <p>Fill in your event details — we'll call you back within 24 hours</p>
        </div>
      </div>

      <section className="section">
        <div className="container booking-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Event Type *</label>
                <select id="eventType" name="eventType" value={form.eventType} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date *</label>
                <input id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="guestCount">Guest Count *</label>
                <input id="guestCount" name="guestCount" type="number" min="1" value={form.guestCount} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budgetRange">Budget Range *</label>
                <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} required>
                  <option value="">Select budget range</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location / Venue *</label>
                <input id="location" name="location" value={form.location} onChange={handleChange} required placeholder="City or venue name" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us more about your event vision..." />
            </div>

            <div className="booking-disclaimer">
              <p>This is a booking <strong>request</strong>, not instant confirmation. We will call you within 24 hours. No online payment required.</p>
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
