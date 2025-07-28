import { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import SpinnerSelector from "../components/SpinnerSelector";
import api from "../utils/api";
import qrCodeImg from "/qrCode.png";

export default function SpinnerPage() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);

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

  const handleLoadNames = async (arr) => {
    setNames(arr);
    try {
      await api.post("/names", arr);
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.5); opacity: 0.2; }
          100% { transform: scale(2);   opacity: 0;   }
        }

        @keyframes pastelFlow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        className="
          w-full min-h-[calc(100vh-69px)]
          px-4 py-10
          flex items-center justify-center
          bg-[length:300%_300%]
          animate-[pastelFlow_20s_ease-in-out_infinite]
          overflow-hidden
        "
        style={{
          background: `linear-gradient(50deg,
            #fdf2f8,
            #fce7f3,
            #dcfce7,
            #dbeafe,
            #ede9fe
          )`,
        }}
      >
        <div className="z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left Section: File Upload & QR */}
          <div className="flex flex-col space-y-6">
            {/* Upload Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Roster</h3>
              <FileUploader onLoadNames={handleLoadNames} />
            </div>

            {/* QR Card — only show on md and up */}
            <div className="hidden md:flex bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 items-center justify-between space-x-4">
              <div>
                <h3 className="text-base font-medium text-gray-700 leading-snug">
                  {winner ? (
                    <span>
                      Hey! {winner},<br /><br />
                      Please scan the QR to add your tip. <br /><br />
                      Best Regards, <br />Ankit Luthra
                    </span>
                  ) : (
                    <span>Scan QR to add your tip.</span>
                  )}
                </h3>
              </div>
              <div className="relative flex items-center justify-center">
                <span
                  className="absolute inline-flex h-60 w-60 rounded-full bg-green-400 opacity-40 blur-2xl animate-[pulseRing_2s_infinite]"
                  style={{ animationFillMode: "forwards" }}
                ></span>
                <img
                  src={qrCodeImg}
                  alt="Scan to add tip"
                  className="relative w-60 h-60 rounded-full border-4 border-white shadow-2xl"
                />
              </div>
            </div>

            {/* Winner Card */}
            {winner && (
              <div
                key={winner}
                className="text-center bg-white rounded-xl p-4 shadow-md border border-green-200"
              >
                <span className="inline-block text-xl font-extrabold text-green-700 drop-shadow-lg animate-bounce">
                  🎉 {winner} 🎉
                </span>
              </div>
            )}
          </div>

          {/* Right Section: Spinner */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Spinner Card */}
            <div className="relative w-full max-w-[500px] bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30">
              <div className="pointer-events-auto">
                <SpinnerSelector names={names} onWinnerSelect={setWinner} />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-green-300/60 animate-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
