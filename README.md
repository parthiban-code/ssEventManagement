# SS Event Management

Full-stack event management website for **SS Event Management** — Tamil Nadu's premium event planning service.

## Quick Start

```bash
# Install dependencies
npm run install:all

# Run development (frontend + backend)
npm run dev
```

- **Website:** http://localhost:5173
- **API:** http://localhost:3001
- **Admin Panel:** http://localhost:5173/admin/login (PIN: `1234`)

## Production

```bash
npm run build
npm start
```

Set `ADMIN_PIN` environment variable to change the admin PIN.
Set `PORT` to change the server port (default: 3001).

## Features

### Public Website
- Home, Services, Packages, Gallery, About, Contact, Booking pages
- Bilingual Tamil/English content with traditional design touches (kolam dividers, toranam strips, mandala motifs)
- Colorful event imagery inspired by marketplace-style event sites
- Manual booking flow — request + 24h callback, no payment gateway

### Admin Panel (`/admin`)
- Dashboard with stats and upcoming events
- Bookings inbox with Approve / Reject / Reset
- Calendar view with double-booking detection
- Auto-generated client list
- Simple PIN login (prototype — replace before production)

### Tech Stack
- **Frontend:** React (Vite), React Router
- **Backend:** Node.js, Express
- **Database:** SQLite (persists across restarts)

## Project Structure

```
├── client/          # React frontend
│   └── src/
│       ├── pages/   # Public pages
│       ├── admin/   # Admin panel
│       ├── components/
│       └── data/    # Content & config
├── server/          # Express API
│   ├── index.js
│   └── db.js
└── package.json
```

## Booking Flow

1. Customer fills "Request a Booking" form
2. System generates unique ID (e.g. `SSE-202606-A3F2`) and saves with status `pending`
3. Confirmation screen shows booking ID + 24h callback message
4. Admin approves/rejects via back-office panel
5. Payment collected offline after phone confirmation

## Security Note

The admin panel uses a simple PIN for prototyping. **Implement proper authentication (OAuth, JWT, etc.) before deploying with real customer data.**
