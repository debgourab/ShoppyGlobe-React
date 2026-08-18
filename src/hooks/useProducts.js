// Custom hook: manage product fetching, loading/error state, retry support, and request cancellation.
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";

export default function useProducts() {
  // Store data and request status locally because the catalogue is consumed by the product list.
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  // Provide a retry function that starts a fresh request and exposes loading/error transitions.
  const loadProducts = useCallback(async () => {
    const controller = new AbortController();
    setStatus("loading");
    setError("");

    try {
      const data = await fetchProducts(controller.signal);
      setProducts(data);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;
      setStatus("error");
      setError(err.message || "Something went wrong while loading products.");
    }

    return () => controller.abort();
  }, []);

  // Perform the initial request and cancel it when the component unmounts.
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    // Encapsulate the awaited fetch so cancellation can prevent stale state updates.
    async function load() {
      setStatus("loading");
      setError("");

      try {
        const data = await fetchProducts(controller.signal);
        if (!cancelled) {
          setProducts(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") {
          setStatus("error");
          setError(err.message || "Something went wrong while loading products.");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  // Expose only the state and retry API needed by consumers.
  return { products, status, error, retry: loadProducts };
}