import { useState } from 'react';
import ActiveTable from '../components/ActiveTable';
import ArchiveTable from '../components/ArchiveTable';
import Toggle from '../components/Toggle';
import { useLeads } from '../hooks/useLeads';
import { useCalls } from '../hooks/useCalls';
import './ContactsPage.css';

export default function ContactsPage() {
  const [tab, setTab] = useState('active');
  const { data: leads, loading: leadsLoading, importing, doImport } = useLeads();
  const { data: calls, loading: callsLoading, statusFilter, changeFilter } = useCalls();

  return (
    <div className="page-container">
      <div className="page-panel">
        <div className="contacts-header">
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
  );
}
