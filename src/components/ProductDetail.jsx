// Product detail: read the dynamic route id, fetch the selected Fake Store API product, and add it to the Redux cart.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { fetchProductById } from "../api/productsApi";
import LazyImage from "./LazyImage";
import Loading from "./Loading";
import ErrorState from "./ErrorState";
import { formatINR } from "../utils/currency";

export default function ProductDetail() {
  // Read the dynamic URL segment so the detail view loads the requested product.
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  // Fetch whenever the route id changes and cancel stale requests during navigation or unmount.
  useEffect(() => {
    const controller = new AbortController();

    // Keep asynchronous work inside the effect so the request lifecycle follows the component lifecycle.
    async function loadProduct() {
      setStatus("loading");
      setError("");

      try {
        const data = await fetchProductById(productId, controller.signal);
        setProduct(data);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setStatus("error");
        setError(
          err.message === "PRODUCT_NOT_FOUND"
            ? "The requested product does not exist."
            : err.message || "Unable to load product details."
        );
      }
    }

    loadProduct();

    // Abort the request if the user navigates away before it finishes.
    return () => controller.abort();
  }, [productId]);

  // Map request state to loading, error, or product content without rendering incomplete data.
  if (status === "loading") return <Loading fullPage />;

  if (status === "error") {
    return (
      <div className="container page-container">
        <ErrorState message={error} />
        <div className="center-link">
          <Link to="/">← Back to products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      {/* Provide an easy way to return to the catalogue. */}
      <Link className="back-link" to="/">← Back to products</Link>

      <section className="detail-card">
        <div className="detail-image-wrap">
          {/* Fake Store API provides a single image URL for every product. */}
          <LazyImage className="detail-image" src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          {/* Display category, title, rating, description, and INR price from the normalized API data. */}
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">
            ★ {product.rating.toFixed(1)} <span>•</span> {product.ratingCount} ratings
          </div>
          <p className="detail-description">{product.description}</p>

          <div className="detail-price">
            {/* The API price is converted from USD to INR in the API service. */}
            <strong>{formatINR(product.price)}</strong>
            <span>Indian Rupee price</span>
          </div>

          <div className="detail-meta">
            {/* Fake Store API exposes category instead of stock, brand, SKU, or warranty fields. */}
            <div><span>Category</span><b>{product.category}</b></div>
            <div><span>Product ID</span><b>SG-{product.id}</b></div>
            <div><span>Ratings</span><b>{product.ratingCount}</b></div>
          </div>

          {/* Add the selected product to the shopping cart. */}
          <button
            className="primary-btn wide-btn"
            type="button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
}
