import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import LazyImage from "./LazyImage";
import { formatINR } from "../utils/currency";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/products/${product.id}`}>
        <LazyImage className="product-image" src={product.thumbnail} alt={product.title} />
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <div className="rating-row">
          <span>★ {product.rating.toFixed(1)}</span>
          <span className="stock-dot">●</span>
          <span>{product.ratingCount} ratings</span>
        </div>

        <div className="price-row">
          <strong>{formatINR(product.price)}</strong>

          <button
            className="add-btn"
            type="button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
