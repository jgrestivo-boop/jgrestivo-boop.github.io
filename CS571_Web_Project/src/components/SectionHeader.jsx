// Shared heading block used across section pages. It keeps page introductions consistent and
// makes the intent of each page clearer at a glance.
function SectionHeader({ title, subtitle }) {
  return (
    <div className="section mb-4">
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
