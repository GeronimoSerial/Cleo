"use client";

import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

const getTimeLeft = (targetDate: string) => {
  const dropDate = new Date(targetDate).getTime();
  const now = Date.now();
  const distance = Math.max(0, dropDate - now);
  return {
    d: Math.floor(distance / (1000 * 60 * 60 * 24)),
    h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center p-4 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-nexus-acid/30 transition-colors"
        >
          <span className="font-display text-4xl md:text-6xl text-white font-bold tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-nexus-acid font-mono text-[10px] uppercase tracking-widest mt-2">
            {unit === "d"
              ? "Dias"
              : unit === "h"
              ? "Hrs"
              : unit === "m"
              ? "Minutos"
              : "Segundos"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
