import './Toggle.css';

export default function Toggle({ value, onChange }) {
  return (
    <div className="toggle-group">
      <button
        className={`toggle-btn ${value === 'active' ? 'toggle-btn-active' : ''}`}
        onClick={() => onChange('active')}
      >
        Active
      </button>
      <button
        className={`toggle-btn ${value === 'archive' ? 'toggle-btn-active' : ''}`}
        onClick={() => onChange('archive')}
      >
        Archive
      </button>
    </div>
  );
}
