import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function TipList(){
  const [tips, setTips] = useState([]);
  useEffect(()=>{
    api.get('/tips').then(r=>setTips(r.data));
  },[]);
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
