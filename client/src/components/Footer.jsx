import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/content';
import Toranam from './Toranam';
import KolamDivider from './KolamDivider';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Toranam count={30} />
      <KolamDivider />
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3>{BUSINESS.name}</h3>
          <p className="tamil">{BUSINESS.taglineTa}</p>
          <p>{BUSINESS.taglineEn}</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/services">Services</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/booking">Request Booking</Link>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <a href={BUSINESS.phoneLink}>{BUSINESS.phone}</a>
          <a href={BUSINESS.instagramLink} target="_blank" rel="noopener noreferrer">
            {BUSINESS.instagram}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
