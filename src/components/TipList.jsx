import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function TipList(){
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/tips')
      .then(r => setTips(r.data))
      .catch(() => setError('Failed to load tips.'))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="text-center py-8">Loading tips…</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  return (
    <ul className="space-y-3">
      {tips.map(t=>(
        <li key={t._id} className="p-3 bg-white dark:bg-gray-800 rounded shadow">
          <strong className="block">{t.author}</strong>
          <p className="mt-1">{t.tip}</p>
        </li>
      ))}
    </ul>
  );
}
