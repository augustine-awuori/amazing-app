import { useEffect } from "react";

import { useCart } from "../hooks";
import { funcs } from "../utils";

const ShoppingCartPage = () => {
  const cart = useCart();

  useEffect(() => {
    funcs.scrollToTop();
  }, []);

  const deliveryCharges = 0;

  return (
    <div className="min-h-screen p-4 pt-0 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">My Cart</h1>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-lg sm:text-xl font-bold">
                Total Items ({cart.count})
              </span>
              <button className="text-red-500">Empty Cart</button>
            </div>

            {cart.products.map((product) => (
              <div
                key={product._id}
                className="card w-full bg-base-100 shadow-xl mb-2 sm:mb-4"
              >
                <div className="card-body flex flex-col sm:flex-row items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-40 h-40 object-cover mb-2 sm:mb-0 rounded-md"
                  />
                  <div className="ml-0 sm:ml-4">
                    <h2 className="card-title">{product.name}</h2>

                    <p>Ksh {product.price}</p>
                  </div>
                  <div className="ml-0 sm:ml-auto flex items-center">
                    <button
                      onClick={() => cart.decrementQuantity(product._id)}
                      className="btn btn-sm btn-outline"
                    >
                      -
                    </button>
                    <span className="mx-2">
                      {cart.getProductQuantity(product._id)}
                    </span>
                    <button
                      onClick={() => cart.incrementQuantity(product._id)}
                      className="btn btn-sm btn-outline"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-2/5 mt-4 lg:mt-0 lg:ml-6">
            <div className="card bg-base-100 shadow-xl p-4">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="mb-4">
                <p>Deliver to:</p>
                <p>
                  Nivaas D, No 15, Srinivasa Nagar, Manathattai, Kulithalai,
                  Karur
                </p>
                <button className="text-blue-500 mt-2">Edit</button>
              </div>
              <div className="mb-4">
                <p>
                  MRP ({cart.count} items):{" "}
                  <span className="float-right">
                    Ksh {cart.getCartGrandTotal()}
                  </span>
                </p>
                <p>
                  Taxes & Charges: <span className="float-right">Ksh 0</span>
                </p>
                <p>
                  Delivery Charges:{" "}
                  <span className="float-right">
                    {deliveryCharges === 0 ? "FREE" : `Ksh ${deliveryCharges}`}
                  </span>
                </p>
              </div>
              <div className="text-xl font-bold mb-4">
                Total:{" "}
                <span className="float-right">
                  Ksh {cart.getCartGrandTotal()}
                </span>
              </div>
              <div className="flex justify-between">
                <button className="btn btn-outline">Cancel</button>
                <button className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
