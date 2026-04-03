import { useState, useRef } from 'react';
import StatusBadge from './StatusBadge';
import FileUpload from './CSVUpload';
import './ActiveTable.css';

export default function ActiveTable({ data, loading, importing, onImport }) {
  const [importMsg, setImportMsg] = useState('');
  const timerRef = useRef(null);

  async function handleImport(rows) {
    const res = await onImport(rows);
    const msg = `${res.imported} imported${res.skipped > 0 ? `, ${res.skipped} skipped` : ''}`;
    setImportMsg(msg);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setImportMsg(''), 4000);
    return res;
  }

  return (
    <div className="active-table">
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <span className="table-count">{data.length} contacts</span>
          {importMsg && <span className="import-msg">{importMsg}</span>}
        </div>
        <FileUpload onImport={handleImport} importing={importing} />
      </div>

      <div className="table-scroll">
        {loading ? (
          <p className="table-loading">Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="table-empty">No contacts found</td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td className="cell-mono">{row.phone}</td>
                    <td className="cell-muted">{row.info}</td>
                    <td><StatusBadge status={row.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
