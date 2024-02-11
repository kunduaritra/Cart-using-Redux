import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const cart = useSelector((state) => state.viewcart);
  return (
    <Layout>
      {cart.isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
