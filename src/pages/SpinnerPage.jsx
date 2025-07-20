// src/pages/SpinnerPage.jsx
import { useState, useEffect } from "react";
import FileUploader    from "../components/FileUploader";
import SpinnerSelector from "../components/SpinnerSelector";
import api from "../utils/api";

export default function SpinnerPage() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing names
  useEffect(() => {
    api
      .get("/names")
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) {
          setNames(r.data);
        }
      })
      .catch((e) => console.error("Fetch error:", e))
      .finally(() => setLoading(false));
  }, []);

  // Upload handler
  const handleLoadNames = async (arr) => {
    setNames(arr);
    try {
      await api.post("/names", arr);
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <div
      className="
        h-full w-full
        bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100
        flex items-center justify-center
        overflow-auto px-4 py-8
      "
    >
      <div className="w-full max-w-[92vw] flex flex-col space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-lg">
            🎲 Team Spinner 🎲
          </h2>
          <p className="mt-2 text-gray-600">
            Upload your roster (up to ~100 names) or use an existing list. Then spin the wheel to pick a lucky winner—complete with confetti!
          </p>
        </div>

        {/* Content Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Uploader & List */}
          <div className="flex flex-col space-y-6">
            {/* Uploader Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Roster</h3>
              <FileUploader onLoadNames={handleLoadNames} />
            </div>

            {/* List Card */}
            <div className="flex-1 bg-white/60 backdrop-blur-xs rounded-2xl p-4 shadow-inner border border-white/20 overflow-auto max-h-[50vh]">
              <h4 className="text-md font-medium text-gray-700 mb-2">Current Roster</h4>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
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
                </div>
              ) : names.length ? (
                <ul className="space-y-2 text-gray-700 text-sm">
                  {names.map((n, i) => (
                    <li
                      key={i}
                      className="
                        px-3 py-1 bg-white/80 rounded-lg
                        hover:bg-green-50 transition
                      "
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 mt-4">
                  No names loaded. Use the uploader above.
                </p>
              )}
            </div>
          </div>

          {/* Right: Spinner Card */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30 overflow-visible pointer-events-none">
              {/* Pointer Arrow */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-green-500"></div>
              </div>

              {/* SpinnerSelector (wheel + button) */}
              <div className="pointer-events-auto">
                <SpinnerSelector names={names} />
              </div>

              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-green-300/60 animate-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
