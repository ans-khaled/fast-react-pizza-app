import { useDispatch } from "react-redux";
import Button from "../../Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dipatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-2">
      <Button
        type="round"
        onClick={() => dipatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{currentQuantity}</span>

      <Button
        type="round"
        onClick={() => dipatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
