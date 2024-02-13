import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          title: newItem.title,
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
    },
    removeItemFromCart(state, action) {
      state.totalQuantity--;
      const removeItemId = action.payload;
      const existingItem = state.items.find((item) => item.id === removeItemId);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removeItemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    increaseItemInCart(state, action) {
      const increaseId = action.payload;
      const increaseData = state.items.find((item) => item.id === increaseId);
      state.totalQuantity++;
      increaseData.quantity++;
      increaseData.totalPrice = increaseData.totalPrice + increaseData.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
