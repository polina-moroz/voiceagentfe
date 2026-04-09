import ScriptEditor from '../components/ScriptEditor';
import { useScript } from '../hooks/useScript';
import './ScriptPage.css';

export default function ScriptPage() {
  const { script, setScript, loading, save } = useScript();

  return (
    <div className="page-container">
      <div className="page-panel">
        {loading ? (
          <p className="loading-text">Loading script...</p>
        ) : (
          <ScriptEditor script={script} onChange={setScript} onSave={save} />
        )}
      </div>
    </div>
  );
}
