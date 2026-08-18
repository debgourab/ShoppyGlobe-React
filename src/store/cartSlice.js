// Redux cart slice: keep cart items and search state together and expose actions for every shopping operation.
import { createSlice } from "@reduxjs/toolkit";

// Keep cart entries and the global catalogue search query in a small normalized state object.
const initialState = {
  items: [],
  searchTerm: ""
};

// Reducers describe every state transition that can occur from the shopping UI.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a new product or increase the quantity of an existing cart line.
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.image,
          quantity: 1
        });
      }
    },
    // Remove the selected product id completely from the cart.
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Increase quantity while keeping the mutation inside Redux Toolkit Immer.
    incrementQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item) item.quantity += 1;
    },
    // Decrease quantity but never allow a cart line to fall below one.
    decrementQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    // Empty every cart line after checkout or an explicit cart reset.
    clearCart(state) {
      state.items = [];
    },
    // Store the search text globally so the header and product list stay synchronized.
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setSearchTerm
} = cartSlice.actions;

export default cartSlice.reducer;