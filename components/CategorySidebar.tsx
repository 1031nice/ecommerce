"use client";

import { Category } from "@lib/types";
import { CATEGORIES } from "@lib/data";

interface CategorySidebarProps {
  selected?: Category | "전체";
  onSelect: (category: Category | "전체") => void;
}

export default function CategorySidebar({ selected = "전체", onSelect }: CategorySidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">카테고리</div>
      <div className="category-list">
        {["전체", ...CATEGORIES].map((c) => {
          const active = selected === c;
          return (
            <button
              key={c}
              className={`category-item${active ? " active" : ""}`}
              onClick={() => onSelect(c as Category | "전체")}
            >
              {c}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

