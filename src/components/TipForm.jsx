import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function TipForm(){
  const [author, setAuthor] = useState('');
  const [tip, setTip]       = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await api.post('/tips',{ author, tip });
    nav('/tips');
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md mx-auto">
      <input
        value={author}
        onChange={e=>setAuthor(e.target.value)}
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <textarea
        value={tip}
        onChange={e=>setTip(e.target.value)}
        placeholder="Your 60s Tip"
        required
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Tip
      </button>
    </form>
  );
}
