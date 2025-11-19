"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
    let animationFrame: number;
    let lastMatrixUpdate = 0;
    let progressValue = 0;

    // Configuración base
    ctx.font = "16px monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";

    const fixedText = "LOADING_STYLE:";
    const baseX = 10;
    const baseY = 25;
    ctx.fillText(fixedText, baseX, baseY);

    const fixedWidth = ctx.measureText(fixedText).width;

    const draw = (time: number) => {
      // Limpiar parte inferior (barra + porcentaje) en cada frame
      ctx.clearRect(0, 40, canvas.width, canvas.height - 40);

      // Avanzar progreso
      progressValue += 0.6; // velocidad (100 ≈ 3.3s)
      if (progressValue >= 100) {
        progressValue = 100;

        // Borrar texto dinámico y escribir final
        ctx.clearRect(baseX + fixedWidth + 5, 0, canvas.width, 40);
        ctx.fillText("Streetwear & Rock", baseX + fixedWidth + 5, baseY);

        // Barra final
        ctx.fillStyle = "#666";
        ctx.fillRect(baseX, 50, 256, 8);
        ctx.fillStyle = "#fff";
        ctx.fillRect(baseX, 50, 256, 8);

        // Porcentaje final
        ctx.fillStyle = "#fff";
        ctx.fillText("100%", baseX, 80);

        setTimeout(() => setIsComplete(true), 1000);
        return;
      }

      // Texto dinámico (cada 200ms)
      if (time - lastMatrixUpdate > 200) {
        const randomText = Array(8)
          .fill(0)
          .map(() =>
            characters.charAt(Math.floor(Math.random() * characters.length)),
          )
          .join("");

        ctx.clearRect(baseX + fixedWidth + 5, 0, canvas.width, 40);
        ctx.fillStyle = "#fff";
        ctx.fillText(randomText, baseX + fixedWidth + 5, baseY);

        lastMatrixUpdate = time;
      }

      // Dibujar barra progreso
      ctx.fillStyle = "#666"; // fondo barra
      ctx.fillRect(baseX, 50, 256, 8);
      ctx.fillStyle = "#fff"; // progreso
      ctx.fillRect(baseX, 50, (progressValue / 100) * 256, 8);

      // Porcentaje
      ctx.fillStyle = "#fff";
      ctx.fillText(`${Math.floor(progressValue)}%`, baseX, 80);

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-60 flex flex-col items-center justify-center bg-dark-900 transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <h1 className="text-white text-4xl font-bold mb-4">Resolv</h1>
      <canvas ref={canvasRef} width={400} height={120} />
    </div>
  );
}
