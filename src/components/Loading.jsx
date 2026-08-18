// Loading state: reusable progress indicator for route and data-loading operations.
export default function Loading({ fullPage = false }) {
  // Render an ARIA status region so loading feedback is announced to assistive technologies.
  return (
    <div className={fullPage ? "loading-state full-page" : "loading-state"} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>Loading ShoppyGlobe...</span>
    </div>
  );
}