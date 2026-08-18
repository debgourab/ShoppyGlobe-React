// Product card: receive a product through props and expose detail navigation plus the Redux Add to Cart action.
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import LazyImage from "./LazyImage";

export default function ProductItem({ product }) {
  // Dispatch the cart action locally so each card can add its own product.
  const dispatch = useDispatch();

  // Render the reusable product card with navigation, pricing, stock, and cart controls.
  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/products/${product.id}`}>
        <LazyImage className="product-image" src={product.thumbnail} alt={product.title} />
        <span className="discount-badge">{Math.round(product.discountPercentage)}% OFF</span>
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <div className="rating-row">
          <span>★ {product.rating.toFixed(1)}</span>
          <span className="stock-dot">●</span>
          <span>{product.stock} in stock</span>
        </div>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
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