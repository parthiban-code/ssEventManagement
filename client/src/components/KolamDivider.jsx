export default function KolamDivider() {
  return (
    <div className="kolam-divider" aria-hidden="true">
      <div className="kolam-line" />
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="kolam-dot" />
      ))}
      <div className="kolam-line" />
    </div>
  );
}
