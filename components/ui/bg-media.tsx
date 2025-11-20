"use client";

import React, { useRef, useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type OverlayVariant = "none" | "light" | "dark";
type MediaType = "image" | "video";

const backgroundVariants = cva(
  "relative h-screen max-h-[1000px] w-full min-h-[500px] lg:min-h-[600px]",
  {
    variants: {
      overlay: {
        none: "",
        light:
          "before:absolute before:inset-0 before:bg-white before:opacity-30",
        dark: "before:absolute before:inset-0 before:bg-black before:opacity-30",
      },
      type: {
        image: "",
        video: "z-10",
      },
    },
    defaultVariants: {
      overlay: "none",
      type: "image",
    },
  }
);

interface BackgroundMediaProps {
  variant?: OverlayVariant;
  type?: MediaType;
  src: string;
  alt?: string;
}

export const BackgroundMedia: React.FC<BackgroundMediaProps> = ({
  variant = "light",
  type = "image",
  src,
  alt = "",
}) => {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Lazy loading del VIDEO por intersection observer
  useEffect(() => {
    if (type !== "video") return;

    const target = observerRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [type]);

  const toggleMediaPlay = () => {
    const el = mediaRef.current;
    if (!el) return;

    if (isPlaying) el.pause();
    else el.play();

    setIsPlaying(!isPlaying);
  };

  const mediaClasses = cn(
    backgroundVariants({ overlay: variant, type }),
    "overflow-hidden"
  );

  return (
    <div className={mediaClasses} ref={observerRef}>
      {type === "video" ? (
        shouldLoad ? (
          <video
            ref={mediaRef}
            aria-hidden="true"
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          // Skeleton mientras el video no entra al viewport
          <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        )
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover rounded-br-[88px]"
        />
      )}

      {type === "video" && shouldLoad && (
        <button
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-4 right-4 z-50 px-4 py-2 bg-gray-900/20 text-white hover:bg-gray-700"
          onClick={toggleMediaPlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      )}
    </div>
  );
};

export default BackgroundMedia;
