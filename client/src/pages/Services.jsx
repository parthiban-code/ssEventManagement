import { Link } from 'react-router-dom';
import { SERVICES } from '../data/content';
import ServiceIcon from '../components/ServiceIcon';
import KolamDivider from '../components/KolamDivider';
import './Services.css';

export default function Services() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>9 specialized services for every type of celebration</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-full-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-full-card">
                <div className="service-full-image">
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <div className="service-full-overlay">
                    <ServiceIcon name={service.icon} size={56} />
                  </div>
                </div>
                <div className="service-full-body">
                  <h3>
                    {service.name}
                    {service.nameTa && (
                      <span className="tamil service-name-ta">{service.nameTa}</span>
                    )}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <KolamDivider />

          <div className="services-cta">
            <h2>Need a Custom Package?</h2>
            <p>Mix and match services or choose from our ready-made packages.</p>
            <div className="services-cta-btns">
              <Link to="/packages" className="btn btn-gold">View Packages</Link>
              <Link to="/booking" className="btn btn-primary">Request Booking</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
