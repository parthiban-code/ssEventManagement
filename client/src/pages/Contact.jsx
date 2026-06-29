import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/content';
import KolamDivider from '../components/KolamDivider';
import './Contact.css';

export default function Contact() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear about your upcoming celebration</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h3>Phone</h3>
              <a href={BUSINESS.phoneLink} className="contact-value">{BUSINESS.phone}</a>
              <p>Call us directly for quick questions</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">📸</span>
              <h3>Instagram</h3>
              <a href={BUSINESS.instagramLink} target="_blank" rel="noopener noreferrer" className="contact-value">
                {BUSINESS.instagram}
              </a>
              <p>Follow us for event photos and updates</p>
            </div>
            <div className="contact-card highlight">
              <span className="contact-icon">📋</span>
              <h3>Booking</h3>
              <p className="contact-value">Request + Callback</p>
              <p>Submit a booking request and we'll call you back within 24 hours. No instant online booking or payment.</p>
              <Link to="/booking" className="btn btn-primary btn-sm">Request a Booking</Link>
            </div>
          </div>

          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Whether you're planning a grand Tamil wedding, a corporate launch, or a birthday party,
              SS Event Management is here to help. Reach out via phone or Instagram, or submit a
              formal booking request for a detailed consultation.
            </p>
            <KolamDivider />
            <div className="contact-note">
              <h4>Important Note</h4>
              <p>
                We do not offer instant online booking or payment. All bookings are confirmed via
                phone call after you submit a request. Payment is collected offline once your event
                is confirmed — simple, personal, and trustworthy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
