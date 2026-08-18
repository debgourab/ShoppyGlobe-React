// Redux store configuration: register the cart reducer under the cart state key.
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Configure Redux once and register the cart slice under a stable state key.
export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});