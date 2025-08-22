"use client";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  console.log(isVisible)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          video.play().catch(console.error);
        } else {
          setIsVisible(false);
          video.pause();
        }
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <video 
        ref={videoRef}
        width={640} 
        height={360} 
        muted 
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}