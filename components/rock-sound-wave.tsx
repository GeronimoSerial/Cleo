"use client"

import { useEffect, useState } from "react"

export function RockSoundWave() {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 20 }, () => Math.random() * 100 + 20)
      setBars(newBars)
    }

    generateBars()
    const interval = setInterval(generateBars, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-end justify-center space-x-1 md:space-x-2 h-16 md:h-20 opacity-30">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-white transition-all duration-700 ease-in-out"
          style={{
            height: `${height}%`,
            width: "2px",
            minHeight: "4px",
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}
