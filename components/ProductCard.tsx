import Link from "next/link";
import { Product } from "@lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img className="card-media" src={product.thumbnailUrl} alt={product.title} />
      </Link>
      <div className="card-body">
        <div className="card-title">{product.title}</div>
        <div className="card-price">{product.price.toLocaleString()}원</div>
        <div className="card-actions">
          <Link className="btn primary" href={`/product/${product.slug}`}>자세히 보기</Link>
          <Link className="btn" href={`/product/${product.slug}#buy`}>구매하기</Link>
        </div>
      </div>
    </div>
  );
}

