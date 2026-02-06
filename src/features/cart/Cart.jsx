import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import LinkButton from "../../LinkButton";
import CartItem from "./CartItem";
import EmtpyCart from "./EmptyCart";

import { getUsername } from "../user/userSlice";
import { getCart, clearCart } from "./cartSlice";

function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);

  const dispath = useDispatch();

  if (cart.length === 0) return <EmtpyCart />;

  return (
    <div className="mx-4 my-5">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="text-xl font-semibold">Your cart, {username}</h2>

      <ul className="my-3 divide-y border-y">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2 font-semibold uppercase">
        <Button type="primary" to="/order/new">
          Order Pizzas
        </Button>
        <Button type="secondary" onClick={() => dispath(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
