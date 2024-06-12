import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Cart = () => {
  const cart = useCart();
  const navigate = useNavigate();

  const cartCount = cart.count;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon />
          <span className="badge badge-sm indicator-item">{cartCount}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{cartCount} Items</span>
          <span className="text-info">
            Subtotal: Ksh {cart.getCartGrandTotal()}
          </span>
          <div className="card-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={() => navigate("/mart/cart")}
            >
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
