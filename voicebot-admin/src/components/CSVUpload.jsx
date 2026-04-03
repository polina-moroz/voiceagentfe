import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import Modal from './Modal';
import './CSVUpload.css';

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ''; });
    return row;
  });
}

function parseXLSX(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  return raw.map((row) => {
    const normalized = {};
    Object.keys(row).forEach((k) => { normalized[k.trim().toLowerCase()] = String(row[k]).trim(); });
    return normalized;
  });
}

export default function FileUpload({ onImport, importing }) {
  const inputRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [parseError, setParseError] = useState('');

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setParseError('');

    const isXLSX = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const parsed = isXLSX ? parseXLSX(ev.target.result) : parseCSV(ev.target.result);
        if (parsed.length === 0) {
          setParseError('No valid rows found. Make sure the file has name and phone columns.');
          return;
        }
        setRows(parsed);
        setShowModal(true);
      } catch {
        setParseError('Could not read the file. Make sure it is a valid .csv or .xlsx file.');
      }
    };

    if (isXLSX) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }

  async function handleConfirm() {
    await onImport(rows);
    closeModal();
  }

  function closeModal() {
    setShowModal(false);
    setRows([]);
    setFileName('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="csv-upload">
      <div className="upload-trigger-row">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          id="csv-input"
          className="csv-input-hidden"
          onChange={handleFile}
        />
        <label htmlFor="csv-input" className="btn btn-secondary csv-upload-btn">
          Upload file
        </label>
        <span className="upload-hint">.csv and .xlsx only</span>
      </div>

      {parseError && <p className="upload-error">{parseError}</p>}

      {showModal && (
        <Modal
          title={`Preview — ${fileName} (${rows.length} rows)`}
          onClose={closeModal}
        >
          <div className="csv-preview-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td className="cell-mono">{row.phone}</td>
                    <td className="cell-muted">{row.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 10 && (
              <p className="csv-preview-more">...and {rows.length - 10} more rows</p>
            )}
          </div>
          <div className="csv-preview-actions">
            <button className="btn btn-primary" onClick={handleConfirm} disabled={importing}>
              {importing ? 'Importing...' : 'Confirm Import'}
            </button>
            <button className="btn btn-ghost" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
