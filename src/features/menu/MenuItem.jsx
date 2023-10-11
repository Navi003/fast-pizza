/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import { getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  function handleAddtoCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: 16,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="italic capitalize tetx-sm text-stone-500 ">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex flex-col items-center gap-3 sm:gap-8 sm:flex-row">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />{" "}
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddtoCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
