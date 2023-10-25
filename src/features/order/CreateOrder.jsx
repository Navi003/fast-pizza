/* eslint-disable react-refresh/only-export-components */
// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
//https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const cart = useSelector(getCart);
  //Navigation has diffrent states which can be loading - submitting etc so we can use it out our advantage
  //and get true or false value based on that we can desable butttons etc.. or render something else while
  //Submitting or loading
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const username = useSelector((state) => state.user.username);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold font">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="p-2 mt-1 text-xs text-red-700 bg-red-100 rounded-md">
              {formErrors?.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="w-full input"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            className="h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const fromData = await request.formData();
  const data = Object.fromEntries(fromData); //Converting JSON to JavaScript Object
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. we might need it to contact you";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
