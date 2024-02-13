import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartVisible: false, notification: null };

const viewCartSlice = createSlice({
  name: "viewcart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const viewcartActions = viewCartSlice.actions;

export default viewCartSlice.reducer;
