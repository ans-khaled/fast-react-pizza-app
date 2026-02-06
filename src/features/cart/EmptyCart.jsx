import LinkButton from "../../LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="font-semibold italic">
        🛒 Your cart is empty Looks like you haven’t added any items yet.
        <br />
        Start browsing the menu to add something delicious 😋
      </p>
    </div>
  );
}

export default EmptyCart;
