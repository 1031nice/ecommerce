export type Category = "상의" | "하의" | "아우터" | "원피스" | "신발" | "액세서리";

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: Category;
  imageUrls: string[];
  thumbnailUrl: string;
}

