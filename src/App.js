import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { viewcartActions } from "./components/store/viewCartRedux";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.viewcart.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notificationStatus = useSelector(
    (state) => state.viewcart.notification
  );

  useEffect(() => {
    const sendDataToServer = async () => {
      dispatch(
        viewcartActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending Cart Data!",
        })
      );
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

      dispatch(
        viewcartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send Cart Data Successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendDataToServer().catch((err) => {
      dispatch(
        viewcartActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notificationStatus && (
        <Notification
          title={notificationStatus.title}
          status={notificationStatus.status}
          message={notificationStatus.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
