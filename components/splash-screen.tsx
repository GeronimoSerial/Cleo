"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
    let interval: NodeJS.Timeout;

    // Matrix text effect
    const matrixInterval = setInterval(() => {
      const randomText = Array(8)
        .fill(0)
        .map(() =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        )
        .join("");
      setMatrixText(randomText);
    }, 50);

    // Progress bar animation
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(matrixInterval);
          setMatrixText("Streetwear & Rock"); // Set final text
          setTimeout(() => setIsComplete(true), 1000); // Delay before hiding splash screen
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-60 flex flex-col items-center justify-center bg-dark-900 transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center mb-2">
        <h1 className="text-white text-4xl font-bold">Cleo</h1>
      </div>

      {/* Matrix-style loading text */}
      <div className="font-mono text-white mb-4 h-6 text-center">{`LOADING_STYLE: ${matrixText}`}</div>

      {/* Progress bar container */}
      <div className="w-64 h-1 bg-dark-400 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <div className="mt-2 font-mono text-sm text-white">{`${progress}%`}</div>
    </div>
  );
}
