import React from "react";
import { Link } from "react-router-dom";
import heroImg from "/heroImg.png";   // your hero illustration
import qrCodeImg from "/qrCode.png"; // your circular QR code

export default function Hero() {
  return (
    <>
      {/* 1) Gradient + pulse-ring keyframes */}
      <style>{`
        @keyframes gradientMove {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>

      {/* 2) Hero section */}
      <section
        style={{
          background: [
            "linear-gradient(50deg,",
            "#fdf2f8,", // pink-50
            "#fce7f3,", // pink-100
            "#dcfce7,", // green-50
            "#dbeafe,", // blue-50
            "#ede9fe)", // indigo-50
          ].join(" "),
          backgroundSize: "200% 200%",
          animation: "gradientMove 5s ease infinite",
          minHeight: "100vh",
        }}
        className="relative overflow-hidden flex items-center justify-center min-h-screen"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 lg:px-8 gap-12">
          {/* ——— LEFT SIDE: Text + Glass Card ——— */}
          <div className="md:w-1/2 space-y-6 z-20">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 drop-shadow-lg">
              Welcome to MinuteMint
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 max-w-md leading-relaxed">
              Share and discover 60-second tips, hacks, and micro-insights that
              boost productivity, spark creativity, and brighten your day.
            </p>

            {/* — Glass Card with one button + one QR (QR hidden on mobile) — */}
            <div
              className="
                relative flex flex-col md:flex-row items-center
                justify-center md:justify-between
                bg-white/35 backdrop-blur-md
                ring-1 ring-white
                rounded-2xl shadow-[0_0_10px_rgba(255,255,255,0.6)]
                px-6 py-4 w-full max-w-md
                transition
                md:gap-8
              "
            >
              {/* Mint Your Tip button */}
              <Link
                to="/add"
                className="
                  bg-green-500 hover:bg-green-600
                  text-white font-semibold rounded-lg
                  px-5 py-2 shadow-md transform hover:scale-105
                  transition-transform duration-200
                  w-full md:w-auto text-center
                  md:mr-0
                "
              >
                Mint Your Tip
              </Link>

              {/* Single QR with pulsing ring — visible only on md+ */}
              <div className="hidden md:flex relative items-center justify-center">
                {/* Pulsing ring behind QR */}
                <span
                  className="
                    absolute inline-flex h-46 w-46 rounded-full bg-green-500 opacity-50
                    animate-[pulseRing_2s_infinite]
                  "
                  style={{ animationFillMode: "forwards" }}
                ></span>

                {/* Actual QR image */}
                <img
                  src={qrCodeImg}
                  alt="Scan to submit your tip"
                  className="relative w-46 h-46 rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* ——— RIGHT SIDE: Hero Illustration ——— */}
          <div className="md:w-1/2 relative">
            <img
              src={heroImg}
              alt="Hero illustration"
              className="w-full rounded-3xl shadow-2xl z-10"
            />
          </div>
        </div>
      </section>
    </>
  );
}
