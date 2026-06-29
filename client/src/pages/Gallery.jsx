import { GALLERY_ITEMS } from '../data/content';
import KolamDivider from '../components/KolamDivider';
import './Gallery.css';

export default function Gallery() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Event Gallery</h1>
          <p>Glimpses from our past celebrations — real photos coming soon</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <img src={item.image} alt={`${item.type} event`} loading="lazy" />
                <div className="gallery-label">
                  <span>{item.type}</span>
                </div>
              </div>
            ))}
          </div>

          <KolamDivider />

          <p className="gallery-note">
            These are placeholder images representing our event types. Real photos from SS Event Management
            celebrations will be added soon. Follow us on Instagram{' '}
            <a href="https://instagram.com/SS_EVENT_MANAGEMENT_01" target="_blank" rel="noopener noreferrer">
              @SS_EVENT_MANAGEMENT_01
            </a>{' '}
            for the latest updates.
          </p>
        </div>
      </section>
    </div>
  );
}
