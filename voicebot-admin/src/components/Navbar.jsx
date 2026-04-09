import './Navbar.css';

export default function Navbar({ user, onLogout, page, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="navbar-logo-text">VoiceBot Admin</span>
        </div>
        <div className="navbar-divider" />
        <nav className="navbar-nav">
          <button
            className={`navbar-nav-item${page === 'script' ? ' active' : ''}`}
            onClick={() => onNavigate('script')}
          >
            Script
          </button>
          <button
            className={`navbar-nav-item${page === 'contacts' ? ' active' : ''}`}
            onClick={() => onNavigate('contacts')}
          >
            Contacts
          </button>
        </nav>
      </div>
      <div className="navbar-right">
        <span className="navbar-user">Signed in as <strong>{user?.name}</strong></span>
        <button className="navbar-logout" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
