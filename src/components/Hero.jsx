import React from "react";
import { Link } from "react-router-dom";
import heroImg from "/heroImg.png";  // your hero image

export default function Hero() {
  return (
    <>
      {/* 1) Define the keyframes right here */}
      <style>{`
        @keyframes gradientMove {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
      `}</style>

      {/* 2) Apply the inline style for the animated gradient */}
      <section
        style={{
          background: [
            "linear-gradient(" +
            "50deg, " +
            "#fdf2f8, " + // pink-50
            "#fce7f3, " + // pink-100
            "#dcfce7, " + // green-50
            "#dbeafe, " + // blue-50
            "#ede9fe" +   // indigo-50
            ")"
          ].join(""),
          backgroundSize: "200% 200%",
          animation: "gradientMove 5s linear infinite",
        }}
        className="py-16"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 gap-8 mt-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to MinuteMint
            </h2>
            <p className="text-gray-600">
              Share and discover amazing 60-second tips, tricks, and hacks.
              From productivity shortcuts to fun facts, mint the moment and
              walk away smarter.
            </p>
            <Link
              to="/add"
              className="
                inline-block px-6 py-3
                bg-green-500 hover:bg-green-600
                text-white font-semibold rounded-lg
                shadow-md transition
              "
            >
              Mint Your Tip
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src={heroImg}
              alt="Hero illustration"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
