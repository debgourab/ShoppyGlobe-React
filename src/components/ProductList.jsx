// Product list: fetch products, filter them from the Redux search term, and render keyed ProductItem components.
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { selectSearchTerm } from "../store/selectors";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

export default function ProductList() {
  // Load the remote catalogue through the custom hook and read the global search query.
  const { products, status, error, retry } = useProducts();
  const searchTerm = useSelector(selectSearchTerm).trim().toLowerCase();

  // Memoize filtering so typing in the search box does not recompute unchanged results.
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    return products.filter((product) =>
      [product.title, product.category, product.brand]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchTerm))
    );
  }, [products, searchTerm]);

  // Handle asynchronous states before rendering the product grid.
  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorState message={error} onRetry={retry} />;

  // Render the catalogue or a no-results message after filtering is complete.
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated collection</p>
          <h2 id="products-heading">Explore Products</h2>
        </div>
        <span className="result-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try a different search term.</p>
        </div>
      )}
    </section>
  );
}