// Checkout: collect customer details, show the order summary, place the dummy order, clear Redux cart, and redirect home.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { selectCartItems, selectCartSubtotal } from "../store/selectors";

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Keep checkout fields controlled so the submitted values always match the visible form.
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", postalCode: "" });
  const [submitted, setSubmitted] = useState(false);

  // Protect the checkout route from being opened with an empty cart.
  useEffect(() => {
    if (!items.length && !submitted) navigate("/cart", { replace: true });
  }, [items.length, navigate, submitted]);

  // Reuse the cart shipping rule to keep checkout totals consistent with the cart page.
  const shipping = subtotal >= 100 ? 0 : 8.99;
  const total = subtotal + shipping;

  // Update only the field that changed while preserving the rest of the form state.
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Prevent a browser reload, show success feedback, clear the cart, and redirect home.
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    dispatch(clearCart());

    // The assignment requires the success message, cart reset, and automatic home redirect.
    setTimeout(() => navigate("/", { replace: true }), 1600);
  }

  // Replace the form with a short success state after a successful submission.
  if (submitted) {
    // Render customer inputs and a read-only order summary side by side.
  return (
      <div className="container page-container">
        <section className="success-card">
          <div className="success-icon">✓</div>
          <h1>Order placed</h1>
          <p>Your order has been received successfully. Redirecting you to the home page...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h1>Checkout</h1>
        </div>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Your details</h2>

          <div className="form-grid">
            <label>Full name<input required name="name" value={form.name} onChange={handleChange} placeholder="John Doe" /></label>
            <label>Email address<input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" /></label>
            <label>Phone number<input required name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" /></label>
            <label>City<input required name="city" value={form.city} onChange={handleChange} placeholder="Kolkata" /></label>
            <label className="full-field">Address<input required name="address" value={form.address} onChange={handleChange} placeholder="Street and house number" /></label>
            <label>Postal code<input required name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="700001" /></label>
          </div>

          <button className="primary-btn wide-btn" type="submit">Place Order</button>
        </form>

        <aside className="summary-card">
          <h2>Your items</h2>
          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>{item.title} × {item.quantity}</span>
              <b>${(item.price * item.quantity).toFixed(2)}</b>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div>
          <div className="summary-row"><span>Shipping</span><b>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</b></div>
          <div className="summary-row total-row"><span>Total</span><b>${total.toFixed(2)}</b></div>
        </aside>
      </div>
    </div>
  );
}