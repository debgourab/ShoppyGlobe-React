// Cart item: display one cart entry and dispatch quantity or removal actions while preserving the minimum quantity of one.
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../store/cartSlice";
import LazyImage from "./LazyImage";

export default function CartItem({ item }) {
  // Dispatch cart actions from button handlers while keeping the component presentation-focused.
  const dispatch = useDispatch();

  // Display product information, quantity controls, line total, and removal action.
  return (
    <article className="cart-item">
      <LazyImage className="cart-item-image" src={item.thumbnail} alt={item.title} />
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)} each</p>
      </div>

      <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
        <button type="button" onClick={() => dispatch(decrementQuantity(item.id))} aria-label="Decrease quantity">−</button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => dispatch(incrementQuantity(item.id))} aria-label="Increase quantity">+</button>
      </div>

      <strong className="cart-line-total">${(item.price * item.quantity).toFixed(2)}</strong>

      <button className="remove-btn" type="button" onClick={() => dispatch(removeFromCart(item.id))}>
        Remove
      </button>
    </article>
  );
}