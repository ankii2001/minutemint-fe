import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AddTipModal() {
  const [author, setAuthor] = useState("");
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Disable body scroll while this modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close the modal by going back one history entry (adjust if you need a different behavior)
  const handleClose = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tips", { author, tip });
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 h-screen z-50 flex items-center justify-center
        bg-transparent bg-opacity-30 backdrop-blur-sm overflow-hidden
      "
    >
      <div
        className="
          relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4
          max-h-[90vh] overflow-y-auto
        "
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-700 text-2xl cursor-pointer"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700">
              Your 60-Second Tip
            </label>
            <textarea
              value={tip}
              onChange={(e) => setTip(e.target.value)}
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
            disabled={loading}
            className={`
              w-full inline-flex items-center justify-center
              px-6 py-3
              font-medium rounded-lg shadow transition-shadow duration-150
              ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-200 hover:bg-green-300 text-green-800"
              }
            `}
          >
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-5 w-5 mr-2 text-green-800"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Processing…" : "Mint My Tip"}
          </button>
        </form>
      </div>
    </div>
  );
}
