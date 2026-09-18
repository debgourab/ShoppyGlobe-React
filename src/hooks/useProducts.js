import { useCallback, useRef, useState } from "react";

export default function useProducts(getProducts) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const activeController = useRef(null);
  const activeRequestId = useRef(0);

  const abortProducts = useCallback(() => {
    activeController.current?.abort();
    activeController.current = null;
    activeRequestId.current += 1;
  }, []);

  const loadProducts = useCallback(async () => {
    if (typeof getProducts !== "function") {
      setStatus("error");
      setError("A product loader function is required.");
      return;
    }

    activeController.current?.abort();
    const controller = new AbortController();
    const requestId = activeRequestId.current + 1;

    activeController.current = controller;
    activeRequestId.current = requestId;

    setStatus("loading");
    setError("");

    try {
      const data = await getProducts(controller.signal);
      const isActiveRequest =
        activeRequestId.current === requestId && !controller.signal.aborted;

      if (!isActiveRequest) return;

      setProducts(data);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;

      if (activeRequestId.current !== requestId) return;

      setStatus("error");
      setError(err.message || "Something went wrong while loading products.");
    } finally {
      if (activeRequestId.current === requestId) {
        activeController.current = null;
      }
    }
  }, [getProducts]);

  return { products, status, error, loadProducts, abortProducts };
}
