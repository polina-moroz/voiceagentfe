import { useState } from 'react';
import Navbar from '../components/Navbar';
import ScriptEditor from '../components/ScriptEditor';
import ActiveTable from '../components/ActiveTable';
import ArchiveTable from '../components/ArchiveTable';
import Toggle from '../components/Toggle';
import { useScript } from '../hooks/useScript';
import { useLeads } from '../hooks/useLeads';
import { useCalls } from '../hooks/useCalls';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState('active');
  const { script, setScript, loading: scriptLoading, save } = useScript();
  const { data: leads, loading: leadsLoading, importing, doImport } = useLeads();
  const { data: calls, loading: callsLoading, statusFilter, changeFilter } = useCalls();

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />
      <div className="dashboard-body">
        <div className="dashboard-left">
          {scriptLoading ? (
            <p className="loading-text">Loading script...</p>
          ) : (
            <ScriptEditor
              script={script}
              onChange={setScript}
              onSave={save}
            />
          )}
        </div>

        <div className="dashboard-right">
          <div className="right-header">
            <h2 className="section-title">Contacts</h2>
            <Toggle value={tab} onChange={setTab} />
          </div>

          {tab === 'active' ? (
            <ActiveTable
              data={leads}
              loading={leadsLoading}
              importing={importing}
              onImport={doImport}
            />
          ) : (
            <ArchiveTable
              data={calls}
              loading={callsLoading}
              statusFilter={statusFilter}
              onFilterChange={changeFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}
