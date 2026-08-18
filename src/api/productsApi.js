// API service: centralize DummyJSON product-list and product-detail requests with HTTP error handling.
// Keep the API base URL in one place so all product requests use the same service endpoint.
import { convertToINR } from "../utils/currency";

const API_URL = "https://dummyjson.com/products";

// Fetch the catalogue and validate the response shape before exposing data to React.
export async function fetchProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products. Server returned ${response.status}.`);
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.products)) {
    throw new Error("The product service returned an unexpected response.");
  }

  return data.products.map((product) => ({ ...product, price: convertToINR(product.price) }));
}

// Fetch one product by route id and convert a 404 into a predictable application error.
export async function fetchProductById(productId, signal) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`, { signal });

  if (response.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Unable to load this product. Server returned ${response.status}.`);
  }

  const product = await response.json();

  // Convert the detail price with the same rule used by the catalogue endpoint.
  return { ...product, price: convertToINR(product.price) };
}