"use client"

export function CreativeGraphics() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Background Elements */}
      <div
        className="absolute top-1/4 -left-32 w-64 h-64 border border-white opacity-10 rotate-45 animate-spin"
        style={{ animationDuration: "20s" }}
      ></div>
      <div
        className="absolute bottom-1/4 -right-32 w-48 h-48 border border-white opacity-10 rotate-45 animate-spin"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      ></div>

      {/* Rock-inspired Jagged Lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 L20,30 L40,60 L60,20 L80,70 L100,40" stroke="white" strokeWidth="0.5" fill="none" />
        <path d="M0,70 L25,50 L50,80 L75,40 L100,60" stroke="white" strokeWidth="0.3" fill="none" />
      </svg>

      {/* Floating Geometric Elements */}
      <div
        className="absolute top-1/3 left-1/6 w-3 h-3 bg-white opacity-60 rotate-45 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-white opacity-40 rotate-45 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white opacity-30 rotate-45 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      ></div>
    </div>
  )
}
