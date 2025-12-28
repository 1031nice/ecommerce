"use client";

import { useState, useRef, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const active = images[activeIndex] ?? images[0];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // 마우스 드래그 지원
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = dragStart - e.clientX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && activeIndex < images.length - 1) {
        setActiveIndex(activeIndex + 1);
        setIsDragging(false);
      } else if (distance < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        setIsDragging(false);
      }
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  // 키보드 화살표 키 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight" && activeIndex < images.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  return (
    <div className="panel">
      <div
        ref={heroRef}
        className="hero-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
      >
        <img className="hero" src={active} alt="product image" draggable={false} />
        {images.length > 1 && (
          <div className="image-indicator">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      <div className="thumbs" style={{ marginTop: 12 }}>
        {images.map((url, idx) => (
          <img
            key={url + idx}
            src={url}
            className="thumb"
            style={{ opacity: idx === activeIndex ? 1 : 0.65 }}
            onClick={() => setActiveIndex(idx)}
            alt="thumbnail"
          />
        ))}
      </div>
    </div>
  );
}

