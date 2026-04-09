import { useState } from 'react';
import Navbar from '../components/Navbar';
import ScriptPage from './ScriptPage';
import ContactsPage from './ContactsPage';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState('script');

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} page={page} onNavigate={setPage} />
      {page === 'script' ? <ScriptPage /> : <ContactsPage />}
    </div>
  );
}
