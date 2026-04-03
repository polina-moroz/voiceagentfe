import './StatusBadge.css';

const STATUS_CLASS = {
  'Not called': 'badge-neutral',
  'No answer': 'badge-warning',
  'Confirmed': 'badge-success',
  'Declined': 'badge-danger',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_CLASS[status] || 'badge-neutral'}`}>
      {status}
    </span>
  );
}
