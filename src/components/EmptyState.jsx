// Empty state: reusable message for carts or collections that currently contain no items.
import { Link } from "react-router-dom";

export default function EmptyState({ title, message, action = true }) {
  // Keep empty-state presentation reusable for different lists or shopping states.
  return (
    <section className="state-card">
      <div className="state-icon">🛍️</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {action && <Link className="primary-btn" to="/">Continue shopping</Link>}
    </section>
  );
}