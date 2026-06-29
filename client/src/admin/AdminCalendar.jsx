import { useState, useEffect } from 'react';
import { getCalendarEvents } from '../api/admin';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

export default function AdminCalendar() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCalendarEvents(month, year).then(setEvents).catch(console.error);
  }, [month, year]);

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month === 1 ? 12 : month - 1);

  const eventsByDate = {};
  events.forEach((e) => {
    const d = e.preferredDate;
    if (!eventsByDate[d]) eventsByDate[d] = [];
    eventsByDate[d].push(e);
  });

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, other: false });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, other: true });
  }

  const today = now.getDate();
  const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;

  return (
    <div>
      <div className="admin-header">
        <h1>Event Calendar</h1>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Confirmed (approved) events shown by date. Red events indicate potential double-bookings.
      </p>

      <div className="calendar-controls">
        <button className="btn btn-outline btn-sm" onClick={prevMonth}>← Prev</button>
        <h3>{MONTHS[month - 1]} {year}</h3>
        <button className="btn btn-outline btn-sm" onClick={nextMonth}>Next →</button>
      </div>

      <div className="calendar-grid">
        {DAYS.map((d) => (
          <div key={d} className="calendar-header">{d}</div>
        ))}
        {cells.map((cell, idx) => {
          const dateStr = cell.other
            ? null
            : `${year}-${String(month).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
          const dayEvents = dateStr ? eventsByDate[dateStr] || [] : [];
          const isDouble = dayEvents.length > 1;

          return (
            <div
              key={idx}
              className={`calendar-day ${cell.other ? 'other-month' : ''} ${isCurrentMonth && cell.day === today && !cell.other ? 'today' : ''}`}
            >
              <div className="calendar-day-number">{cell.day}</div>
              {dayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className={`calendar-event ${isDouble ? 'double-booking' : ''}`}
                  title={`${ev.fullName} — ${ev.eventType} at ${ev.location}`}
                >
                  {ev.eventType}: {ev.fullName.split(' ')[0]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
