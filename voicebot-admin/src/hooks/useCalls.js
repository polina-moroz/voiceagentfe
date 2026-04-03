import { useState, useEffect, useCallback } from 'react';
import { getCalls } from '../api/calls';

export function useCalls() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetch = useCallback(async (status = '') => {
    setLoading(true);
    try {
      setData(await getCalls({ status }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(statusFilter); }, [fetch, statusFilter]);

  function changeFilter(status) {
    setStatusFilter(status);
  }

  return { data, loading, statusFilter, changeFilter };
}
