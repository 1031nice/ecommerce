"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@lib/types";
import { CATEGORIES } from "@lib/data";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    price: "",
    quantity: "",
    category: "" as Category | "",
    origin: "",
    images: [] as File[],
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 상품 등록
    alert("상품이 등록되었습니다. 운영자 검수 후 승인됩니다.");
    router.push("/");
  };

  return (
    <div className="content">
      <h1 style={{ marginTop: 0, marginBottom: 24 }}>상품등록</h1>

      <form className="panel form-grid" onSubmit={handleSubmit}>
        <label>
          제목 *
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="상품 제목을 입력하세요"
          />
        </label>

        <label>
          내용 *
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="상품 설명을 입력하세요"
            rows={6}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              color: "var(--text)",
              fontSize: "1.0625rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>
            단가 (원) *
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </label>

          <label>
            수량 *
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              placeholder="1"
            />
          </label>
        </div>

        <label>
          카테고리 *
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              color: "var(--text)",
              fontSize: "1.0625rem",
              height: "44px",
            }}
          >
            <option value="">카테고리를 선택하세요</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          출고지 *
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            placeholder="예: 서울특별시 강남구"
          />
        </label>

        <label>
          이미지 (최대 3장) *
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              fontSize: "1rem",
            }}
          />
          {formData.images.length > 0 && (
            <div style={{ marginTop: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
              선택된 파일: {formData.images.length}개
            </div>
          )}
        </label>

        <label>
          요청사항
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="운영자에게 전달할 요청사항이 있으면 입력하세요"
            rows={4}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              color: "var(--text)",
              fontSize: "1.0625rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </label>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => router.back()}>
            취소
          </button>
          <button type="submit" className="btn primary">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

