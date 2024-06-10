import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { funcs } from "../utils";
import { Modal, TextArea } from "../components";
import { useCart, useOrders, useUser } from "../hooks";

const MAX_AUTO_ORDER_TRIALS = 3;

const ShoppingCartPage = () => {
  const [takingMessage, setTakingMessage] = useState(false);
  const [promptCartClearance, setCartClearance] = useState(false);
  const [orderPlacementTrials, setOrderPlacementTrial] = useState(0);
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const helper = useOrders();
  const cart = useCart();

  useEffect(() => {
    funcs.scrollToTop();
  }, []);

  const deliveryCharges = 0;

  const handleCartClearance = () => {
    setCartClearance(false);
    cart.clear();
  };

  const takeOrderMessage = () => {
    if (!user)
      return toast.info(
        "You need to login. Seller need to know who's ordering"
      );

    if (!takingMessage) setTakingMessage(true);
  };

  const makeOrder = async () => {
    setTakingMessage(false);
    setOrderPlacementTrial((trial) => trial + 1);

    const success = await helper.makeShopsOrders(message);
    if (!success && orderPlacementTrials < MAX_AUTO_ORDER_TRIALS)
      await makeOrder();
  };

  return (
    <section className="min-h-screen p-4 pt-0 sm:p-8">
      <Modal
        content="Are you sure you want to empty your cart? This action is irreversible"
        isOpen={promptCartClearance}
        onClose={() => setCartClearance(false)}
        title="Empty Cart Confirmation"
        primaryBtnLabel="Empty Cart"
        secondaryBtnLabel="Dismiss"
        onPrimaryBtnClick={handleCartClearance}
      />
      <Modal
        content={
          <TextArea
            placeholder="Attach message to your order (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        }
        isOpen={takingMessage}
        onClose={() => setTakingMessage(false)}
        title="Attach Message"
        primaryBtnLabel="Proceed"
        onPrimaryBtnClick={makeOrder}
      />
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">My Cart</h1>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-lg sm:text-xl font-bold">
                Total Items ({cart.count})
              </span>
              <button
                className="text-red-500"
                onClick={() => setCartClearance(true)}
              >
                Empty Cart
              </button>
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

                    <p>Ksh {funcs.addComma(product.price)}</p>
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
                <p className="text-primary">
                  After you place the order, the seller will be notified and
                  will reach out to you with details on how the product(s) will
                  be delivered
                </p>
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
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    if (cart.count) setCartClearance(true);
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={takeOrderMessage}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartPage;
