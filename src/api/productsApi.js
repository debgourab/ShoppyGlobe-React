// API service: centralize DummyJSON product-list and product-detail requests with HTTP error handling.
const API_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products. Server returned ${response.status}.`);
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.products)) {
    throw new Error("The product service returned an unexpected response.");
  }

  return data.products;
}

export async function fetchProductById(productId, signal) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`, { signal });

  if (response.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Unable to load this product. Server returned ${response.status}.`);
  }

  return response.json();
}