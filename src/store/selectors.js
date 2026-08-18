// Redux selectors: provide reusable access to cart items, search text, item count, and subtotal.
// Select the complete cart list for components that need item-level information.
export const selectCartItems = (state) => state.cart.items;

// Select the current catalogue search query from Redux.
export const selectSearchTerm = (state) => state.cart.searchTerm;

// Derive the total number of units so the header badge reflects quantities, not unique products.
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Derive the monetary subtotal from price multiplied by quantity for every cart line.
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);