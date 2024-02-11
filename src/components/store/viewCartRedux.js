import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartVisible: false };

const viewCartSlice = createSlice({
  name: "viewcart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const viewcartActions = viewCartSlice.actions;

export default viewCartSlice.reducer;
