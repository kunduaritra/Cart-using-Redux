import { createSlice } from "@reduxjs/toolkit";
import { viewcartActions } from "./viewCartRedux";

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
    setCartData(state, action) {
      const item = action.payload;
      state.items.push(item);
      state.totalQuantity = Number(state.totalQuantity) + Number(item.quantity);
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      viewcartActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://cart-redux-e9fc6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({ cart }),
        }
      );
      if (!res.ok) {
        throw new Error("Sending Data Failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        viewcartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send Cart Data Successfully!",
        })
      );
    } catch (err) {
      dispatch(
        viewcartActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      viewcartActions.showNotification({
        status: "pending",
        title: "Fetching Data...",
        message: "Fetching Cart Data From Server!",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://cart-redux-e9fc6-default-rtdb.firebaseio.com/cart.json"
      );

      if (!res.ok) {
        throw new Error("Fetching Data From Server Failed!");
      }
      const resData = await res.json();
      Object.values(resData).forEach((item) => {
        for (const i in item.items) {
          dispatch(cartActions.setCartData(item.items[i]));
          console.log(item.items[i]);
        }
      });
    };

    try {
      await sendRequest();

      dispatch(
        viewcartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully Fetched Cart Data!",
        })
      );
    } catch (err) {
      dispatch(
        viewcartActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching Cart Data Failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
