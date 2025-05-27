import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AddTipPage() {
  const [author, setAuthor] = useState("");
  const [tip, setTip]       = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/tips", { author, tip });
    navigate("/tips");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          className="
            mt-2 w-full border border-gray-300 rounded-lg
            px-4 py-2 text-gray-800
            focus:outline-none
            focus:ring-1 focus:ring-green-300 focus:ring-opacity-50
            focus:shadow-[0_0_10px_rgba(72,187,120,0.6)]
            transition
          "
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Your 60-Second Tip</label>
        <textarea
          value={tip}
          onChange={e => setTip(e.target.value)}
          rows={4}
          required
          className="
            mt-2 w-full border border-gray-300 rounded-lg
            px-4 py-2 text-gray-800
            focus:outline-none
            focus:ring-1 focus:ring-green-300 focus:ring-opacity-50
            focus:shadow-[0_0_10px_rgba(72,187,120,0.6)]
            transition resize-none h-32
          "
        />
      </div>
      <button
        type="submit"
        className="
          w-full inline-flex items-center justify-center
          px-6 py-3
          bg-green-200 hover:bg-green-300
          text-green-800 font-medium
          rounded-lg shadow cursor-pointer
          transition-shadow duration-150
        "
      >
        Mint My Tip
      </button>
    </form>
  );
}
