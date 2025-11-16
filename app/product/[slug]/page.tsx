"use client";

import { useMemo, useState } from "react";
import { getProductBySlug } from "@lib/data";
import ImageGallery from "@components/ImageGallery";
import Modal from "@components/Modal";

interface PageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = useMemo(() => getProductBySlug(params.slug), [params.slug]);
  const [open, setOpen] = useState(false);

  if (!product) {
    return <div className="panel">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="product-page">
      <ImageGallery images={product.imageUrls} />
      <div className="panel" id="buy">
        <h1 style={{ marginTop: 0 }}>{product.title}</h1>
        <div style={{ color: "var(--muted)" }}>{product.category}</div>
        <div style={{ fontSize: 20, fontWeight: 700, margin: "12px 0" }}>
          {product.price.toLocaleString()}원
        </div>
        <button className="btn primary" onClick={() => setOpen(true)}>구매하기</button>
        <div style={{ marginTop: 16, color: "var(--muted)" }}>
          여러 장의 이미지를 좌측 갤러리에서 확인할 수 있어요.
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="구매 정보 입력">
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            alert("더미 구매 처리 완료!");
            setOpen(false);
          }}
        >
          <label>
            Field 1
            <input required placeholder="예: 값 1" />
          </label>
          <label>
            Field 2
            <input required placeholder="예: 값 2" />
          </label>
          <label>
            Field 3
            <input required placeholder="예: 값 3" />
          </label>
          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setOpen(false)}>
              취소
            </button>
            <button type="submit" className="btn primary">
              제출
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

