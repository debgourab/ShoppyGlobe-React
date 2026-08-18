// Product card: receive a normalized Fake Store API product and expose detail navigation plus the Redux cart action.
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import LazyImage from "./LazyImage";
import { formatINR } from "../utils/currency";

export default function ProductItem({ product }) {
  // Dispatch the cart action locally so each product card can add its own product.
  const dispatch = useDispatch();

  // Render a card using only fields supplied by the Fake Store API.
  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/products/${product.id}`}>
        {/* Fake Store API provides one product image, which is normalized to thumbnail. */}
        <LazyImage className="product-image" src={product.thumbnail} alt={product.title} />
      </Link>

      <div className="product-body">
        {/* Show the API category above the product title. */}
        <p className="product-category">{product.category}</p>

        {/* Link the title to the dynamic product detail route. */}
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        {/* Display the Fake Store rating and number of ratings. */}
        <div className="rating-row">
          <span>★ {product.rating.toFixed(1)}</span>
          <span className="stock-dot">●</span>
          <span>{product.ratingCount} ratings</span>
        </div>

        <div className="price-row">
          {/* Prices are converted from the API's USD value into Indian Rupees. */}
          <strong>{formatINR(product.price)}</strong>

          {/* Add the selected product to the Redux cart. */}
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
