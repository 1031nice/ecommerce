"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="searchbar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색어를 입력하세요"
        aria-label="상품 검색"
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
}

