import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartPrice } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);

  const [hasAddressValue, setHasAddressValue] = useState(false);

  const cart = useSelector(getCart);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const totalCartPrice = useSelector(getCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const isAddressLoading = addressStatus === "loading";

  return (
    <div className="mx-4 my-8">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <label className="sm:basis-[8rem]">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-center sm:gap-6">
          <label className="sm:basis-[8rem]">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-center sm:gap-6">
          <label className="sm:basis-[8rem]">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isAddressLoading}
              onChange={() => setHasAddressValue(true)}
            />

            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {addressError}
              </p>
            )}

            {!position.latitude && !position.longitude && !hasAddressValue && (
              <span className="absolute bottom-[41px] right-[3px] z-50 sm:right-[3px] sm:top-[5px]">
                <Button
                  type="small"
                  disabled={isAddressLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 rounded-full accent-yellow-300 outline-none transition-all duration-300 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* To send the cart in order */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* To send the position in order */}
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Pleasse give us the correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Don't overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
