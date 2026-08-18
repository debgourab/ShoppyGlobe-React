// Error state: reusable failure UI with an optional retry action.
export default function ErrorState({ message, onRetry }) {
  // Show the error message and expose retry only when the caller supplies a retry handler.
  return (
    <section className="state-card error-card" role="alert">
      <div className="state-icon">!</div>
      <h2>Could not load the products</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="primary-btn" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}