// 404 page: show route/error details and provide a safe navigation path back to Home.
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  // useRouteError is only available inside a data-router error boundary, so guard it for normal rendering too.
  let routerError = null;

  try {
    routerError = useRouteError();
  } catch {
    routerError = null;
  }

  // Normalize router error details into safe display values with 404 fallbacks.
  const isRouteError = Boolean(routerError);
  const status = routerError?.status || 404;
  const statusText = routerError?.statusText || "Page Not Found";

  // Present a clear recovery path back to the store when a route cannot be resolved.
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">ShoppyGlobe error</p>
        <div className="error-code">{status}</div>
        <h1>{statusText}</h1>
        <p>
          {isRouteError && routerError?.data
            ? String(routerError.data)
            : "The page or resource you requested could not be found."}
        </p>
        <div className="error-details">
          <span><b>Status:</b> {status}</span>
          <span><b>Requested route:</b> {window.location.pathname}</span>
        </div>
        <Link className="primary-btn" to="/">Return to Home</Link>
      </div>
    </main>
  );
}