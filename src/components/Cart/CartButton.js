import { useDispatch, useSelector } from "react-redux";
import { viewcartActions } from "../store/viewCartRedux";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const toggleCart = () => {
    dispatch(viewcartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
