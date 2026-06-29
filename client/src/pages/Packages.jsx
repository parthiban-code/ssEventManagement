import { Link } from 'react-router-dom';
import { PACKAGES } from '../data/content';
import KolamDivider from '../components/KolamDivider';
import './Packages.css';

export default function Packages() {
  return (
    <div>
      <div className="page-header packages-header">
        <div className="container">
          <h1>Event Packages</h1>
          <p>Complete arrangements for every budget — nothing left to plan</p>
        </div>
      </div>

      <section className="section packages-section">
        <div className="container">
          {PACKAGES.map((pkg, idx) => (
            <div key={pkg.id} className={`package-card ${pkg.highlight ? 'highlight' : ''}`}>
              <div className="package-card-image">
                <img src={pkg.image} alt={pkg.name} />
                {pkg.highlight && <span className="package-badge">Most Popular</span>}
              </div>
              <div className="package-card-content">
                <h2>{pkg.name}</h2>
                {pkg.nameTa && <p className="package-ta tamil">{pkg.nameTa}</p>}
                <p className="package-desc">{pkg.description}</p>
                <h4>What's Included:</h4>
                <ul className="package-items">
                  {pkg.items.map((item) => (
                    <li key={item}>
                      <span className="check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="btn btn-primary">
                  Request This Package
                </Link>
              </div>
            </div>
          ))}

          <KolamDivider />

          <div className="packages-note">
            <h3>How Booking Works</h3>
            <div className="booking-steps">
              <div className="step">
                <span className="step-num">1</span>
                <h4>Submit Request</h4>
                <p>Fill out our booking form with your event details.</p>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <h4>We Call You</h4>
                <p>Our team calls back within 24 hours to discuss your event.</p>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <h4>Confirm & Pay</h4>
                <p>Once confirmed, payment is collected offline — no online payment needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
