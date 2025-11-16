import { Product, Category } from "./types";

export const CATEGORIES: Category[] = ["상의", "하의", "아우터", "원피스", "신발", "액세서리"];

// Dummy products
export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    slug: "basic-tee-black",
    title: "베이직 티셔츠 - 블랙",
    price: 19900,
    category: "상의",
    imageUrls: [
      "https://picsum.photos/seed/basic-tee-black-1/1200/900",
      "https://picsum.photos/seed/basic-tee-black-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/basic-tee-black-thumb/600/450"
  },
  {
    id: "p-2",
    slug: "relaxed-jeans-blue",
    title: "릴랙스 핏 데님 - 블루",
    price: 49900,
    category: "하의",
    imageUrls: [
      "https://picsum.photos/seed/relaxed-jeans-blue-1/1200/900",
      "https://picsum.photos/seed/relaxed-jeans-blue-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/relaxed-jeans-blue-thumb/600/450"
  },
  {
    id: "p-3",
    slug: "light-coach-jacket",
    title: "라이트 코치 자켓",
    price: 79900,
    category: "아우터",
    imageUrls: [
      "https://picsum.photos/seed/light-coach-jacket-1/1200/900",
      "https://picsum.photos/seed/light-coach-jacket-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/light-coach-jacket-thumb/600/450"
  },
  {
    id: "p-4",
    slug: "summer-onepiece",
    title: "서머 원피스",
    price: 69900,
    category: "원피스",
    imageUrls: [
      "https://picsum.photos/seed/summer-onepiece-1/1200/900",
      "https://picsum.photos/seed/summer-onepiece-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/summer-onepiece-thumb/600/450"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

