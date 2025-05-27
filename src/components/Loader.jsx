import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  if (!loading) return null;
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
