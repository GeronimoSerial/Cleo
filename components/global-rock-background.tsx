"use client";

export function GlobalRockBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base black background with subtle texture */}
      <div className="absolute inset-0 bg-black" />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-black opacity-70" /> */}
      <div className="min-h-screen w-full relative bg-black">
        {/* Magenta Nebula Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
          }}
        />

        {/* Your Content/Components */}
      </div>
      {/* Metal grid pattern - more aggressive */}
      <div className="absolute opacity-20">
        {/* Horizontal lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute w-full h-px bg-gray-700"
            style={{
              top: `${8 + i * 8}%`,
              opacity: i % 2 === 0 ? 0.3 : 0.15,
              boxShadow: i % 3 === 0 ? "0 0 1px rgba(128,128,128,0.4)" : "none",
            }}
          />
        ))}

        {/* Vertical lines */}
      </div>

      {/* Sharp corner brackets - industrial style */}
      <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32">
        <div className="absolute top-2 left-2 md:top-4 md:left-4 w-4 h-4 md:w-8 md:h-8 border-l-2 border-t-2 border-gray-600 opacity-50"></div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32">
        <div className="absolute top-2 right-2 md:top-4 md:right-4 w-4 h-4 md:w-8 md:h-8 border-r-2 border-t-2 border-gray-600 opacity-50"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32">
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-4 h-4 md:w-8 md:h-8 border-l-2 border-b-2 border-gray-600 opacity-50"></div>
      </div>

      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32">
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-4 h-4 md:w-8 md:h-8 border-r-2 border-b-2 border-gray-600 opacity-50"></div>
      </div>

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-05"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(128,128,128,0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(128,128,128,0.05) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(128,128,128,0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Harsh light streaks */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-gray-500 via-transparent to-transparent opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-30"></div>

      {/* CLEO text background */}
      <div
        className="absolute inset-0 flex items-end justify-center opacity-5 text-gray-700 text-9xl font-bold "
        style={{
          //   transform: "rotate(-15deg)",
          whiteSpace: "nowrap",
        }}
      >
        CLEO
      </div>
    </div>
  );
}
