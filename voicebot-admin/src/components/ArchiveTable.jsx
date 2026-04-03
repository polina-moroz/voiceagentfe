import StatusBadge from './StatusBadge';
import './ArchiveTable.css';

const FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Declined', label: 'Declined' },
];

export default function ArchiveTable({ data, loading, statusFilter, onFilterChange }) {
  return (
    <div className="archive-table">
      <div className="table-toolbar">
        <span className="table-count">{data.length} calls</span>
        <div className="filter-group">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`filter-btn ${statusFilter === opt.value ? 'filter-btn-active' : ''}`}
              onClick={() => onFilterChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
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
                <th>Date</th>
                <th>Status</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty">No records found</td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td className="cell-mono">{row.phone}</td>
                    <td className="cell-muted">{row.date}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td className="cell-muted">{row.comment}</td>
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
