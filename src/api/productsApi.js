// API service: centralize Fake Store API requests and normalize product data for the UI.
// The Fake Store API returns prices in USD and a compact product shape, so we adapt it here.
import { convertToINR } from "../utils/currency";

// Use the requested Fake Store API as the single product data source.
const API_URL = "https://fakestoreapi.com/products";

// Normalize one Fake Store API product so the rest of the app receives consistent fields.
function normalizeProduct(product) {
  // Fake Store API exposes rating as an object, while the UI expects a numeric rating value.
  const rating = Number(product?.rating?.rate || 0);

  // Return only the fields needed by the catalogue, detail page, and cart.
  return {
    ...product,
    price: convertToINR(product.price),
    image: product.image,
    thumbnail: product.image,
    rating,
    ratingCount: Number(product?.rating?.count || 0)
  };
}

// Fetch the complete product catalogue and validate the response before returning it.
export async function fetchProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products. Server returned ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The product service returned an unexpected response.");
  }

  // Convert every API product into the application's normalized INR format.
  return data.map(normalizeProduct);
}

// Fetch one product by id and normalize it for the detail page.
export async function fetchProductById(productId, signal) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`, { signal });

  if (response.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Unable to load this product. Server returned ${response.status}.`);
  }

  const product = await response.json();

  // Normalize the individual product using the same rules as the catalogue endpoint.
  return normalizeProduct(product);
}
