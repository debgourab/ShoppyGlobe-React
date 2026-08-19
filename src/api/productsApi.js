import { convertToINR } from "../utils/currency";

const API_URL = "https://fakestoreapi.com/products";

function normalizeProduct(product) {
  const rating = Number(product?.rating?.rate || 0);

  return {
    ...product,
    price: convertToINR(product.price),
    image: product.image,
    thumbnail: product.image,
    rating,
    ratingCount: Number(product?.rating?.count || 0)
  };
}

export async function fetchProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products. Server returned ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The product service returned an unexpected response.");
  }

  return data.map(normalizeProduct);
}

export async function fetchProductById(productId, signal) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`, { signal });

  if (response.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Unable to load this product. Server returned ${response.status}.`);
  }

  const product = await response.json();

  return normalizeProduct(product);
}
