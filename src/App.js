import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./components/store/cartSlice";
import { fetchCartData } from "./components/store/cartSlice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.viewcart.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notificationStatus = useSelector(
    (state) => state.viewcart.notification
  );

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchCartData());
      return;
    }
    dispatch(sendCartData(cart));
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
