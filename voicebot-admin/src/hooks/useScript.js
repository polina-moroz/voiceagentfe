import { useState, useEffect } from 'react';
import { getActiveScript, updateActiveScript } from '../api/scripts';

export function useScript() {
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getActiveScript()
      .then(({ script: s }) => setScript(s))
      .finally(() => setLoading(false));
  }, []);

  async function save(newScript) {
    setSaving(true);
    try {
      const { script: s } = await updateActiveScript(newScript);
      setScript(s);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return { script, setScript, loading, saving, saved, save };
}
