"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];
  return (
    <div className="panel">
      <img className="hero" src={active} alt="product image" />
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

