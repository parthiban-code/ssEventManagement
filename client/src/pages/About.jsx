import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/content';
import KolamDivider from '../components/KolamDivider';
import './About.css';

export default function About() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Turning your dreams into reality, one event at a time</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&h=500&fit=crop"
              alt="SS Event Management team at work"
            />
          </div>
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              SS Event Management was born from a passion for creating unforgettable celebrations.
              Based in Tamil Nadu, we specialize in Tamil-style weddings, corporate events, temple
              functions, and every celebration in between.
            </p>
            <p className="tamil philosophy">
              {BUSINESS.philosophyTa}
            </p>
            <p>{BUSINESS.philosophyEn}</p>
          </div>
        </div>

        <KolamDivider />

        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Our Approach</h2>
          <div className="approach-grid">
            <div className="approach-card">
              <span className="approach-icon">🎯</span>
              <h3>Personal Attention</h3>
              <p>Every event gets a dedicated coordinator who understands your vision and culture.</p>
            </div>
            <div className="approach-card">
              <span className="approach-icon">🏛️</span>
              <h3>Traditional Roots</h3>
              <p>Authentic Tamil wedding elements — mandapam, chenda melam, panthal — done with modern flair.</p>
            </div>
            <div className="approach-card">
              <span className="approach-icon">✨</span>
              <h3>End-to-End Service</h3>
              <p>From decoration to photography to food — one team handles everything so you can enjoy your day.</p>
            </div>
            <div className="approach-card">
              <span className="approach-icon">📞</span>
              <h3>Personal Callback</h3>
              <p>Submit a request and we'll call you within 24 hours. No instant booking — real human connection.</p>
            </div>
          </div>

          <div className="about-cta">
            <Link to="/booking" className="btn btn-primary">Start Planning Your Event</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
