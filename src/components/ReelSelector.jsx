import React, { useRef, useState } from "react";

export default function ReelSelector({ names }) {
  const reelRef = useRef(null);
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (!names.length) return alert("Upload names first");

    const count    = names.length;
    const chosen   = Math.floor(Math.random() * count);
    const reel     = reelRef.current;
    const itemH    = 50; // must match CSS height of each <li>
    const totalH   = count * itemH;
    const loops    = 5;  // full loops before stopping
    const stopPos  = loops * totalH + chosen * itemH;

    // Apply CSS scroll animation
    reel.style.transition      = "transform 3s cubic-bezier(0.33,1,0.68,1)";
    reel.style.transform       = `translateY(-${stopPos}px)`;
    setSpinning(true);
    setWinner("");

    // cleanup on finish
    reel.addEventListener(
      "transitionend",
      () => {
        // reset position to the aligned item without the loops
        reel.style.transition = "none";
        reel.style.transform  = `translateY(-${chosen * itemH}px)`;
        setSpinning(false);
        setWinner(names[chosen]);
      },
      { once: true }
    );
  };

  return (
    <div className="text-center space-y-4">
      <div className="overflow-hidden h-50 w-64 mx-auto border-4 border-gray-200 rounded-lg">
        <ul
          ref={reelRef}
          className="space-y-0"
          style={{ transform: "translateY(0)" }}
        >
          {names.map((n,i) => (
            <li
              key={i}
              className="h-12 flex items-center justify-center bg-white text-gray-800 border-b"
            >
              {n}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="
          px-6 py-2
          bg-green-200 hover:bg-green-300
          text-green-800 font-semibold
          rounded-full shadow
          disabled:opacity-50
          transition
        "
      >
        {spinning ? "Spinning…" : "Spin the Reel"}
      </button>

      {winner && !spinning && (
        <div className="text-2xl font-bold text-green-600 flex items-center justify-center space-x-2">
          <span>🎉</span>
          <span>{winner}</span>
          <span>🎉</span>
        </div>
      )}
    </div>
  );
}
