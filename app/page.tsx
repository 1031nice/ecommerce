"use client";

import { useMemo, useState } from "react";
import SearchBar from "@components/SearchBar";
import CategorySidebar from "@components/CategorySidebar";
import ProductCard from "@components/ProductCard";
import { PRODUCTS } from "@lib/data";
import { Category } from "@lib/types";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "전체">("전체");
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesQuery = query.trim()
        ? p.title.toLowerCase().includes(query.trim().toLowerCase())
        : true;
      const matchesCat = category === "전체" ? true : p.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return arr;
  }, [filtered, sort]);

  return (
    <div className="layout">
      <CategorySidebar selected={category} onSelect={setCategory} />
      <div className="content">
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="list-toolbar">
          <select
            aria-label="정렬 선택"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="sort-select"
          >
            <option value="price-asc">낮은가격순</option>
            <option value="price-desc">높은가격순</option>
          </select>
        </div>
        <div className="grid">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {sorted.length === 0 ? (
            <div className="panel">조건에 맞는 상품이 없습니다.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

