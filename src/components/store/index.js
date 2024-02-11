import { configureStore } from "@reduxjs/toolkit";
import viewCartReducer from "./viewCartRedux";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    viewcart: viewCartReducer,
    cart: cartReducer,
  },
});

export default store;
