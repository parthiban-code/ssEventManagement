export default function Toranam({ count = 20 }) {
  return (
    <div className="toranam" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="toranam-leaf" />
      ))}
    </div>
  );
}
