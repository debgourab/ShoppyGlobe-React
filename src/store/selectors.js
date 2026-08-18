// Redux selectors: provide reusable access to cart items, search text, item count, and subtotal.
export const selectCartItems = (state) => state.cart.items;

export const selectSearchTerm = (state) => state.cart.searchTerm;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);