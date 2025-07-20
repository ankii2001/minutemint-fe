// src/components/SpinnerSelector.jsx
import React, { useRef, useEffect, useState } from "react";

export default function SpinnerSelector({ names }) {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);

  // 1) Draw a pastel rainbow wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || names.length === 0) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.clientWidth;
    const center = size / 2;
    const radius = center * 0.9;
    const sliceAngle = (2 * Math.PI) / names.length;

    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    names.forEach((label, i) => {
      const start = sliceAngle * i - Math.PI / 2;
      const end = sliceAngle * (i + 1) - Math.PI / 2;
      const hue = (i * 360) / names.length;

      // Pastel gradient for each slice
      const grad = ctx.createLinearGradient(
        center + Math.cos(start) * radius,
        center + Math.sin(start) * radius,
        center + Math.cos(end) * radius,
        center + Math.sin(end) * radius
      );
      grad.addColorStop(0, `hsl(${hue}, 60%, 85%)`);
      grad.addColorStop(1, `hsl(${hue}, 60%, 70%)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.fill();

      // White border between slices
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.lineTo(center, center);
      ctx.stroke();

      // Label with subtle shadow
      ctx.save();
      ctx.translate(center, center);
      const bisector = start + sliceAngle / 2;
      ctx.rotate(bisector);

      ctx.fillStyle = "#333";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "right";
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      let text = label;
      const maxWidth = radius * 0.6;
      const measure = (t) => ctx.measureText(t).width;
      if (measure(text) > maxWidth) {
        while (measure(text + "...") > maxWidth && text.length) {
          text = text.slice(0, -1);
        }
        text += "...";
      }
      ctx.fillText(text, radius - 12, 0);
      ctx.restore();
    });

    // Soft glossy inner circle
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.3, 0, 2 * Math.PI);
    const innerGrad = ctx.createRadialGradient(
      center, center, 0,
      center, center, radius * 0.3
    );
    innerGrad.addColorStop(0, "#ffffffcc");
    innerGrad.addColorStop(1, "#ffffff00");
    ctx.fillStyle = innerGrad;
    ctx.fill();

    // Pastel outer rim
    ctx.strokeStyle = "hsl(200, 60%, 75%)";
    ctx.lineWidth = radius * 0.05;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }, [names]);

  // 2) Full-screen natural confetti + sparkles
  function launchConfetti() {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9999,
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Confetti pieces: more count for wow
    const confetti = Array.from({ length: 400 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      w: 5 + Math.random() * 10,
      h: 4 + Math.random() * 6,
      vx: -1 + Math.random() * 2,
      vy: 2 + Math.random() * 4,
      rotation: Math.random() * 2 * Math.PI,
      vrot: -0.05 + Math.random() * 0.1,
      color: `hsl(${Math.random() * 360}, 75%, 70%)`,
    }));

    // Sparkles overlay
    const sparkles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      r: 1 + Math.random() * 2,
      vy: 1 + Math.random() * 2,
      alpha: 1,
      fade: 0.005 + Math.random() * 0.005,
      hue: 180 + Math.random() * 60, // pastel bluish
    }));

    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw confetti (rotating rectangles)
      confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.vrot;
        if (c.y < canvas.height + 20) {
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rotation);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          ctx.restore();
        }
      });

      // Draw sparkling circles
      sparkles.forEach((s) => {
        s.y += s.vy;
        s.alpha -= s.fade;
        if (s.alpha > 0 && s.y < canvas.height + 10) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
          ctx.fillStyle = `hsla(${s.hue}, 75%, 80%, ${s.alpha})`;
          ctx.fill();
        }
      });

      if (elapsed < 2) requestAnimationFrame(animate);
      else document.body.removeChild(canvas);
    }
    requestAnimationFrame(animate);
  }

  // 3) Spin with bounce
  const spin = () => {
    if (spinning || names.length === 0) return;
    setSpinning(true);
    setWinner("");
    const N = names.length;
    const sliceDeg = 360 / N;
    const idx = Math.floor(Math.random() * N);
    const rotations = 4 + Math.random() * 3;
    const offsetDeg = idx * sliceDeg + sliceDeg / 2;
    const finalDeg = rotations * 360 - offsetDeg;

    const wheel = wheelRef.current;
    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${finalDeg}deg)`;

    wheel.addEventListener(
      "transitionend",
      () => {
        // bounce
        wheel.style.transition = "transform 0.3s ease-in-out";
        wheel.style.transform = `rotate(${finalDeg + 3}deg)`;
        setTimeout(() => {
          wheel.style.transform = `rotate(${finalDeg}deg)`;
          setTimeout(() => {
            setSpinning(false);
            const selected = names[idx];
            setWinner(selected);
            launchConfetti();
          }, 200);
        }, 200);
      },
      { once: true }
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Wheel + Center Label */}
      <div className="relative">
        <div
          ref={wheelRef}
          onClick={spin}
          className={`
            w-56 h-56 md:w-80 md:h-80
            rounded-full shadow-2xl bg-gray-50
            cursor-pointer
            ${spinning ? "opacity-75" : "hover:scale-105 hover:shadow-3xl"}
            transition-transform
          `}
          style={{ transform: "rotate(0deg)" }}
        >
          <canvas ref={canvasRef} className="w-full h-full rounded-full" />
        </div>
        {winner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl md:text-3xl font-extrabold text-green-700 drop-shadow-lg animate-bounce">
              {winner}
            </span>
          </div>
        )}
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning || names.length === 0}
        className={`
          px-6 py-2 md:px-10 md:py-3
          bg-green-600 hover:bg-green-700 text-white
          rounded-full font-semibold shadow-lg
          disabled:bg-gray-300 disabled:cursor-not-allowed
          active:scale-95 transition-transform
        `}
      >
        {spinning ? "Spinning…" : "Spin the Wheel"}
      </button>
    </div>
  );
}
