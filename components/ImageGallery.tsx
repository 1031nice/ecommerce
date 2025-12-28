"use client";

import { useState, useRef, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const active = images[activeIndex] ?? images[0];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    // 오른쪽으로 스와이프(왼쪽에서 오른쪽) = 음수, 왼쪽으로 스와이프(오른쪽에서 왼쪽) = 양수
    const offset = currentX - touchStart;
    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    // 오른쪽으로 스와이프(왼쪽에서 오른쪽) = 양수, 왼쪽으로 스와이프(오른쪽에서 왼쪽) = 음수
    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance; // 오른쪽에서 왼쪽으로 → 다음 이미지
    const isRightSwipe = distance > minSwipeDistance; // 왼쪽에서 오른쪽으로 → 이전 이미지

    setIsDragging(false);
    setDragOffset(0);

    if (isLeftSwipe && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // 마우스 드래그 지원
  const [mouseDragStart, setMouseDragStart] = useState(0);
  const [mouseDragOffset, setMouseDragOffset] = useState(0);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDragging(true);
    setMouseDragStart(e.clientX);
    setMouseDragOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDragging) return;
    // 오른쪽으로 드래그(왼쪽에서 오른쪽) = 양수, 왼쪽으로 드래그(오른쪽에서 왼쪽) = 음수
    const offset = e.clientX - mouseDragStart;
    setMouseDragOffset(offset);
  };

  const onMouseUp = () => {
    if (!isMouseDragging) return;
    // 오른쪽으로 드래그(왼쪽에서 오른쪽) = 양수, 왼쪽으로 드래그(오른쪽에서 왼쪽) = 음수
    const distance = (mouseDragStart + mouseDragOffset) - mouseDragStart;
    const isLeftSwipe = mouseDragOffset < -minSwipeDistance; // 오른쪽에서 왼쪽으로 → 다음 이미지
    const isRightSwipe = mouseDragOffset > minSwipeDistance; // 왼쪽에서 오른쪽으로 → 이전 이미지

    setIsMouseDragging(false);
    setMouseDragOffset(0);

    if (isLeftSwipe && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
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

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const currentOffset = isDragging ? dragOffset : (isMouseDragging ? mouseDragOffset : 0);
  // 왼쪽으로 스와이프(음수 offset) → 다음 이미지(오른쪽)가 왼쪽에서 나타나야 함 → translateX를 더 음수로
  // 오른쪽으로 스와이프(양수 offset) → 이전 이미지(왼쪽)가 오른쪽에서 나타나야 함 → translateX를 더 양수로
  // offset을 더하면: 음수 offset을 더하면 더 음수, 양수 offset을 더하면 덜 음수(더 양수)
  const translateX = -(activeIndex * containerWidth) + currentOffset;

  return (
    <div className="panel">
      <div
        ref={containerRef}
        className="hero-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ 
          cursor: (isDragging || isMouseDragging) ? "grabbing" : "grab", 
          userSelect: "none",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          className="hero-slider"
          style={{
            display: "flex",
            transform: `translateX(${translateX}px)`,
            transition: (isDragging || isMouseDragging) ? "none" : "transform 0.3s ease-out",
            willChange: "transform"
          }}
        >
          {images.map((url, idx) => (
            <img
              key={url + idx}
              className="hero"
              src={url}
              alt={`product image ${idx + 1}`}
              draggable={false}
              style={{
                minWidth: "100%",
                width: "100%",
                height: "auto",
                objectFit: "cover",
                flexShrink: 0
              }}
            />
          ))}
        </div>
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

