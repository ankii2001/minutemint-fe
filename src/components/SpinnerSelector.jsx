// src/components/SpinnerSelector.jsx
import React, { useRef, useEffect, useState } from "react";

export default function SpinnerSelector({ names }) {
  const canvasRef = useRef(null);
  const wheelRef  = useRef(null);
  const [winner, setWinner]     = useState("");
  const [spinning, setSpinning] = useState(false);

  // 1) Draw wheel whenever names change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !names.length) return;
    const ctx    = canvas.getContext("2d");
    const size   = 450;           
    const center = size / 2;
    const radius = center * 0.9;
    const slice  = (2 * Math.PI) / names.length;
    const dpr    = window.devicePixelRatio || 1;

    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    names.forEach((name, i) => {
      const start = slice * i - Math.PI / 2;
      const end   = slice * (i + 1) - Math.PI / 2;

      ctx.fillStyle = `hsl(${(i * 360) / names.length}, 65%, 85%)`;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.fill();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + slice / 2);
      ctx.fillStyle  = "#222";
      ctx.font       = "bold 16px sans-serif";
      ctx.textAlign  = "right";
      ctx.fillText(name, radius - 20, 0);
      ctx.restore();
    });

    const grad = ctx.createRadialGradient(
      center, center, radius * 0.95,
      center, center, radius
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth   = radius * 0.08;
    ctx.strokeStyle = grad;
    ctx.stroke();
  }, [names]);

  // 2) Confetti animation
  function launchConfetti() {
    const C = document.createElement("canvas");
    Object.assign(C.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9999,
    });
    document.body.appendChild(C);
    const ctx = C.getContext("2d");
    C.width  = window.innerWidth;
    C.height = window.innerHeight;

    const pieces = Array.from({ length: 200 }, () => ({
      x: Math.random() * C.width,
      y: Math.random() * -C.height,
      w: 6 + Math.random() * 6,
      h: 3 + Math.random() * 3,
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 8,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    }));

    let start = null;
    function frame(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      ctx.clearRect(0, 0, C.width, C.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.w, p.h);
      });
      if (elapsed < 2) requestAnimationFrame(frame);
      else document.body.removeChild(C);
    }
    requestAnimationFrame(frame);
  }

  // 3) Spin logic
  const spin = () => {
    if (!names.length) return alert("Upload names first");
    setSpinning(true);
    setWinner("");
    const N         = names.length;
    const segDeg    = 360 / N;
    const idx       = Math.floor(Math.random() * N);
    const spins     = 6 + Math.random() * 4;
    const centerDeg = idx * segDeg + segDeg / 2;
    const finalDeg  = spins * 360 - centerDeg;

    const wheel = wheelRef.current;
    wheel.style.transformOrigin = "50% 50%";
    wheel.style.transition      = "transform 4s cubic-bezier(0.33,1,0.68,1)";
    wheel.style.transform       = `rotate(${finalDeg}deg)`;

    wheel.addEventListener(
      "transitionend",
      () => {
        // wobble
        wheel.style.transition = "transform 0.3s ease-out";
        wheel.style.transform += " rotate(2deg)";
        setTimeout(() => {
          wheel.style.transform = `rotate(${finalDeg}deg)`;
          setTimeout(() => {
            wheel.style.transition = "";
            setSpinning(false);
            setWinner(names[idx]);
            launchConfetti();    // 🎉 full-screen party boom!
          }, 300);
        }, 300);
      },
      { once: true }
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel */}
      <div
        ref={wheelRef}
        onClick={spinning ? null : spin}
        className="
          relative
          w-64 h-64
          md:w-[450px] md:h-[450px]
          rounded-full shadow-2xl
          cursor-pointer bg-gray-100
        "
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-full"
        />
        {/* Gloss shine */}
        <div className="
          absolute inset-0 rounded-full
          bg-gradient-to-br from-white/30 via-white/10 to-transparent
          pointer-events-none
        " />
      </div>

      {/* Button */}
      {!spinning ? (
        <button
          onClick={spin}
          className="
            px-10 py-4 bg-green-300 hover:bg-green-400
            text-white text-xl font-semibold
            rounded-full shadow-lg
            active:scale-95 transition
          "
        >
          Spin the Wheel
        </button>
      ) : (
        <button
          disabled
          className="
            px-10 py-4 bg-green-200 text-green-700
            rounded-full shadow-inner cursor-wait animate-pulse
          "
        >
          Spinning…
        </button>
      )}

      {/* Winner */}
      {winner && !spinning && (
        <div className="
          flex items-center space-x-3
          text-4xl font-extrabold text-green-700
          animate-bounce
        ">
          <span>🎉</span><span>{winner}</span><span>🎉</span>
        </div>
      )}
    </div>
  );
}
