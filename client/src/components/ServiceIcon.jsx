const icons = {
  wedding: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="20" r="8" />
      <path d="M20 52c0-8 5-14 12-14s12 6 12 14" />
      <circle cx="48" cy="24" r="6" />
      <path d="M40 52c0-6 4-10 8-10s8 4 8 10" />
      <path d="M8 32h48M32 8v8" strokeDasharray="4 4" />
    </svg>
  ),
  reception: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="28" width="48" height="24" rx="2" />
      <path d="M16 28V20h32v8" />
      <circle cx="32" cy="16" r="4" />
      <path d="M24 40h16M28 36h8" />
    </svg>
  ),
  birthday: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="16" y="32" width="32" height="20" rx="2" />
      <path d="M20 32V24h24v8" />
      <line x1="32" y1="12" x2="32" y2="24" />
      <circle cx="32" cy="10" r="3" fill="currentColor" />
      <path d="M24 20c2-4 4-4 8 0s6-4 8 0" />
    </svg>
  ),
  corporate: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="16" width="40" height="36" rx="2" />
      <path d="M24 16V12h16v4" />
      <line x1="32" y1="28" x2="32" y2="40" />
      <line x1="26" y1="34" x2="38" y2="34" />
    </svg>
  ),
  temple: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 8L8 28h48L32 8z" />
      <rect x="14" y="28" width="36" height="24" />
      <rect x="26" y="40" width="12" height="12" />
      <circle cx="32" cy="20" r="3" />
    </svg>
  ),
  dj: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <path d="M32 12v4M32 48v4M12 32h4M48 32h4" />
    </svg>
  ),
  makeup: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="32" cy="28" rx="16" ry="20" />
      <path d="M20 48c4 8 20 8 24 0" />
      <path d="M24 24c2 2 6 2 8 0M36 24c2 2 6 2 8 0" />
      <path d="M28 36c2 2 6 2 8 0" />
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="16" width="48" height="36" rx="4" />
      <circle cx="32" cy="34" r="10" />
      <circle cx="32" cy="34" r="4" />
      <circle cx="48" cy="24" r="3" />
    </svg>
  ),
  lighting: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" />
      <line x1="32" y1="44" x2="32" y2="52" />
      <line x1="24" y1="52" x2="40" y2="52" />
    </svg>
  ),
};

export default function ServiceIcon({ name, size = 48 }) {
  return (
    <div style={{ width: size, height: size, color: 'var(--maroon)' }}>
      {icons[name] || icons.wedding}
    </div>
  );
}
