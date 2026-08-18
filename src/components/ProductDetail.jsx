// Product detail: read the dynamic route id, fetch that product with useEffect, handle errors, and add it to Redux cart.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { fetchProductById } from "../api/productsApi";
import LazyImage from "./LazyImage";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

export default function ProductDetail() {
  // Read the dynamic URL segment so the detail view always loads the requested product.
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  // Fetch whenever the route id changes and cancel stale requests during navigation or unmount.
  useEffect(() => {
    const controller = new AbortController();

    // Keep asynchronous work inside the effect so request lifecycle follows the component lifecycle.
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
        setError(err.message === "PRODUCT_NOT_FOUND"
          ? "The requested product does not exist."
          : err.message || "Unable to load product details.");
      }
    }

    loadProduct();
    // Render the selected product with pricing, metadata, image, and cart action.
  return () => controller.abort();
  }, [productId]);

  // Map request state to loading, error, or product content without rendering incomplete data.
  if (status === "loading") return <Loading fullPage />;
  if (status === "error") {
    return (
      <div className="container page-container">
        <ErrorState message={error} />
        <div className="center-link"><Link to="/">← Back to products</Link></div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <Link className="back-link" to="/">← Back to products</Link>
      <section className="detail-card">
        <div className="detail-image-wrap">
          <LazyImage className="detail-image" src={product.images?.[0] || product.thumbnail} alt={product.title} />
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">★ {product.rating.toFixed(1)} <span>•</span> {product.stock} available</div>
          <p className="detail-description">{product.description}</p>

          <div className="detail-price">
            <strong>${product.price.toFixed(2)}</strong>
            <span>{Math.round(product.discountPercentage)}% discount</span>
          </div>

          <div className="detail-meta">
            <div><span>Brand</span><b>{product.brand || "ShoppyGlobe"}</b></div>
            <div><span>SKU</span><b>{product.sku || `SG-${product.id}`}</b></div>
            <div><span>Warranty</span><b>{product.warrantyInformation || "Standard warranty"}</b></div>
          </div>

          <button className="primary-btn wide-btn" type="button" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
}