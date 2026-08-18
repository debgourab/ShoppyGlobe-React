// Product list: fetch products, filter them from the Redux search term, and render keyed ProductItem components.
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { selectSearchTerm } from "../store/selectors";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

// Render the catalogue and keep conditional product content separate from the main JSX tree.
export default function ProductList() {
  // Load the remote catalogue through the custom hook and read the global search query.
  const { products, status, error, retry } = useProducts();
  const searchTerm = useSelector(selectSearchTerm).trim().toLowerCase();

  // Memoize filtering so typing in the search box only recalculates when the inputs change.
  const filteredProducts = useMemo(() => {
    // Return the complete catalogue when the user has not entered a search query.
    if (!searchTerm) {
      return products;
    }

    // Match the search query against the most useful product text fields.
    return products.filter((product) =>
      [product.title, product.category, product.brand]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchTerm))
    );
  }, [products, searchTerm]);

  // Show the loading UI until the initial catalogue request finishes.
  if (status === "loading") {
    return <Loading />;
  }

  // Show the retryable error UI when the catalogue request fails.
  if (status === "error") {
    return <ErrorState message={error} onRetry={retry} />;
  }

  // Build the product content separately so the main return statement has no nested ternary expression.
  const productContent = filteredProducts.length > 0 ? (
    <div className="product-grid">
      {/* Map every product to a reusable card and use the stable product id as its React key. */}
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  ) : (
    // Show a clear empty state when the current search does not match any product.
    <div className="no-results">
      <h3>No products found</h3>
      <p>Try a different search term.</p>
    </div>
  );

  // Render the catalogue heading, result count, and prepared product content.
  return (
    <section className="products-section" aria-labelledby="products-heading">
      {/* Keep the heading and result count together for a clear catalogue summary. */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated collection</p>
          <h2 id="products-heading">Explore Products</h2>
        </div>

        {/* Display a grammatically correct singular/plural product count. */}
        <span className="result-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Insert either the product grid or the no-results state created above. */}
      {productContent}
    </section>
  );
}
