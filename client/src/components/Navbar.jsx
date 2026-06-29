import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BUSINESS } from '../data/content';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">SS</span>
          <span className="brand-text">
            <strong>SS Event</strong>
            <small>Management</small>
          </span>
        </Link>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/booking" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Request Booking
          </Link>
        </nav>
      </div>
    </header>
  );
}
