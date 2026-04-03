import { useState, useEffect, useCallback } from 'react';
import { getLeads, importLeads } from '../api/leads';

export function useLeads() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      setData(await getLeads());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  async function doImport(csvRows) {
    setImporting(true);
    try {
      const result = await importLeads(csvRows);
      await fetch();
      return result;
    } finally {
      setImporting(false);
    }
  }

  return { data, loading, importing, fetch, doImport };
}
