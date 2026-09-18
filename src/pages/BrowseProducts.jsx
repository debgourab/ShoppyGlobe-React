import { useState } from "react";
import ProductList from "../components/ProductList";

export default function BrowseProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <section className="browse-hero">
        <div className="container browse-hero-inner">
          <div>
            <p className="eyebrow">Browse Products</p>
            <h1>Find the right product faster.</h1>
            <p>
              Search the catalogue by product name, category, or brand and move from discovery to cart without leaving this page.
            </p>
          </div>

          <label className="browse-search" htmlFor="product-search">
            <span>Search products</span>
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                id="product-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try jacket, jewellery, backpack..."
                type="search"
              />
            </div>
          </label>
        </div>
      </section>

      <div className="container">
        <ProductList searchTerm={searchTerm} />
      </div>
    </>
  );
}
