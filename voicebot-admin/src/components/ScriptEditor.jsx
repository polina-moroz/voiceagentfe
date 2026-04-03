import { startCallingQueue, stopCallingQueue } from '../api/leads';
import { useState } from 'react';
import './ScriptEditor.css';

export default function ScriptEditor({ script, onChange, onSave }) {
  const [queueRunning, setQueueRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);

  async function handleStart() {
    setStarting(true);
    try {
      await onSave(script);
      await startCallingQueue();
      setQueueRunning(true);
    } finally {
      setStarting(false);
    }
  }

  async function handleStop() {
    setStopping(true);
    try {
      await stopCallingQueue();
      setQueueRunning(false);
    } finally {
      setStopping(false);
    }
  }

  return (
    <div className="script-editor">
      <div className="script-editor-header">
        <h2 className="section-title">Call Script</h2>
      </div>
      <textarea
        className="script-textarea"
        value={script}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="Enter call script..."
      />
      {queueRunning ? (
        <button
          className="start-btn start-btn--stop"
          onClick={handleStop}
          disabled={stopping}
        >
          {stopping ? 'Stopping...' : 'Stop Calling Queue'}
        </button>
      ) : (
        <button
          className="start-btn"
          onClick={handleStart}
          disabled={starting}
        >
          {starting ? 'Saving & Starting...' : 'Start Calling Queue'}
        </button>
      )}
    </div>
  );
}
