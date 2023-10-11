import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between p-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-4 md:text-base ">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6 ">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
