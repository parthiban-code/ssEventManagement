import { Link } from 'react-router-dom';
import { BUSINESS, SERVICES, TESTIMONIALS, STATS } from '../data/content';
import Toranam from '../components/Toranam';
import KolamDivider from '../components/KolamDivider';
import ServiceIcon from '../components/ServiceIcon';
import './Home.css';

function MandalaSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="#C9A227" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="70" stroke="#C9A227" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" stroke="#C9A227" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="30" stroke="#C9A227" strokeWidth="0.5" />
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="10"
          x2="100"
          y2="190"
          stroke="#C9A227"
          strokeWidth="0.3"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="30"
          rx="8"
          ry="15"
          stroke="#C9A227"
          strokeWidth="0.3"
          fill="none"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </svg>
  );
}

export default function Home() {
  const featured = SERVICES.slice(0, 6);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.pexels.com/photos/1103242/pexels-photo-1103242.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Grand wedding celebration"
          />
          <div className="hero-overlay" />
        </div>
        <Toranam count={40} />
        <div className="hero-content container">
          <div className="mandala-bg">
            <MandalaSVG />
          </div>
          <span className="hero-badge">Premium Event Management</span>
          <h1>{BUSINESS.taglineEn}</h1>
          <p className="hero-tamil tamil">{BUSINESS.taglineTa}</p>
          <p className="hero-sub tamil">{BUSINESS.philosophyTa}</p>
          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">Request a Booking</Link>
            <Link to="/services" className="btn btn-secondary">Explore Services</Link>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <KolamDivider />

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            From Tamil weddings to corporate launches — we handle every celebration with care.
          </p>
          <div className="services-grid">
            {featured.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-image">
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <div className="service-card-icon">
                    <ServiceIcon name={service.icon} size={36} />
                  </div>
                </div>
                <div className="service-card-body">
                  <h3>
                    {service.name}
                    {service.nameTa && <span className="tamil service-ta"> · {service.nameTa}</span>}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-gold">View All 9 Services →</Link>
          </div>
        </div>
      </section>

      <section className="section packages-preview">
        <div className="container">
          <h2 className="section-title">Event Packages</h2>
          <p className="section-subtitle">
            All-inclusive arrangements — nothing left to plan, nothing left to worry.
          </p>
          <div className="packages-preview-grid">
            <div className="package-preview-card featured">
              <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2ece?w=600&h=400&fit=crop" alt="Wedding package" />
              <div className="package-preview-body">
                <span className="package-tag">Most Popular</span>
                <h3>Wedding Package <span className="tamil">· திருமண பேக்கேஜ்</span></h3>
                <p>12 inclusions — decoration, photography, food, DJ, chenda melam & more.</p>
                <Link to="/packages" className="btn btn-primary btn-sm">View Details</Link>
              </div>
            </div>
            <div className="package-preview-card">
              <img src="https://images.unsplash.com/photo-1464349095432-e228a98dabe3?w=600&h=400&fit=crop" alt="Birthday package" />
              <div className="package-preview-body">
                <h3>Birthday Package <span className="tamil">· பிறந்தநாள் பேக்கேஜ்</span></h3>
                <p>Decoration, cakes, party food, and return gifts.</p>
                <Link to="/packages" className="btn btn-secondary btn-sm">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KolamDivider />

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by families across Tamil Nadu for their celebrations.</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Ready to Plan Your Event?</h2>
            <p>Submit a booking request and we'll call you back within 24 hours.</p>
          </div>
          <Link to="/booking" className="btn btn-gold">Request a Booking</Link>
        </div>
      </section>
    </div>
  );
}
