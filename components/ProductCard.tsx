import Link from "next/link";
import { Product } from "@lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="card">
      <img className="card-media" src={product.thumbnailUrl} alt={product.title} />
      <div className="card-body">
        <div className="card-title">{product.title}</div>
        <div className="card-price">{product.price.toLocaleString()}원</div>
      </div>
    </Link>
  );
}

