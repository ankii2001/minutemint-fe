// src/pages/TipsPage.jsx
import { useEffect, useState } from "react";
import api from "../utils/api";

// Date helper
function formatDateTime(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const date = d.toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit", minute: "2-digit",
  });
  return `${date} • ${time}`;
}

export default function TipsPage() {
  const [tips, setTips]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tips")
      .then(res => setTips(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* 1) Define the scrolling keyframes and hook hover via .group:hover */}
      <style>{`
        @keyframes borderPan {
          0%   { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        .border-pan {
          background: linear-gradient(
            90deg,
            #d8b4fe, /* purple-300 */
            #86efac, /* green-300 */
            #fef9c3, /* yellow-200 */
            #bfdbfe, /* blue-200 */
            #fbcfe8  /* pink-200 */
          );
          background-size: 200% 100%;
          transition: transform 1s;
        }
        .group:hover .border-pan {
          animation: borderPan 1.5s linear infinite;
        }
      `}</style>

      <section className="max-w-[92vw] mx-auto bg-gray-50 py-12 md:p-10 rounded-xl shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-green-500 inline-block pb-2">
            All Tips
          </h2>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {tips.map(({ _id, author, tip, createdAt }) => (
                <li
                  key={_id}
                  className="relative group overflow-hidden rounded-2xl p-1 cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105"
                >
                  {/* 2) Continuous panning gradient border layer */}
                  <div className="border-pan absolute inset-0 rounded-2xl" />

                  {/* 3) Static white content pane */}
                  <div className="relative bg-white rounded-2xl p-6 flex flex-col justify-between h-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <div>
                      <h4 className="text-xl font-semibold text-green-700">
                        {author}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatDateTime(createdAt)}
                      </p>
                    </div>
                    <p className="mt-5 text-gray-700 leading-tight break-words whitespace-normal text-left">
                      {tip}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
