import { useEffect, useMemo } from "react";
import { fetchProducts } from "../api/productsApi";
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

export default function ProductList({ searchTerm = "" }) {
  const { products, status, error, loadProducts, abortProducts } = useProducts(fetchProducts);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  useEffect(() => {
    loadProducts();

    return () => abortProducts();
  }, [loadProducts, abortProducts]);

  const filteredProducts = useMemo(() => {
    if (!normalizedSearchTerm) {
      return products;
    }

    return products.filter((product) =>
      [product.title, product.category, product.brand]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearchTerm))
    );
  }, [products, normalizedSearchTerm]);

  if (status === "idle" || status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={loadProducts} />;
  }

  const productContent = filteredProducts.length > 0 ? (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="no-results">
      <h3>No products found</h3>
      <p>Try searching for a different product, brand, or category.</p>
    </div>
  );

  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated collection</p>
          <h2 id="products-heading">
            {normalizedSearchTerm ? "Search Results" : "All Products"}
          </h2>
        </div>

        <span className="result-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      {productContent}
    </section>
  );
}
