// Cart page: read Redux cart state, calculate totals, render CartItem rows, and navigate to checkout.
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubtotal } from "../store/selectors";
import CartItem from "./CartItem";
import EmptyState from "./EmptyState";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const navigate = useNavigate();
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 8.99) : 0;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <div className="container page-container">
        <EmptyState title="Your cart is empty" message="Add some products and they will appear here." />
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Shopping bag</p>
          <h1>Your Cart</h1>
        </div>
        <Link className="back-link" to="/">Continue shopping →</Link>
      </div>

      <div className="cart-layout">
        <section className="cart-list">
          {items.map((item) => <CartItem key={item.id} item={item} />)}
        </section>

        <aside className="summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div>
          <div className="summary-row"><span>Shipping</span><b>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</b></div>
          <div className="summary-divider" />
          <div className="summary-row total-row"><span>Total</span><b>${total.toFixed(2)}</b></div>
          <button className="primary-btn wide-btn" type="button" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}