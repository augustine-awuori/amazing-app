import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Modal } from "../components";
import { useOrders } from "../hooks";
import service from "../services/orders";
import Table from "../components/orders/Table";
import useOrder, { Order, OrderProducts } from "../hooks/useOrder";

const ProfileOrderPage = () => {
  const { orderId } = useParams();
  const { order: cachedOrder } = useOrder();
  const [order, setOrder] = useState<Order>();
  const [orderProducts, setOrderProducts] = useState<OrderProducts>({});
  const [cofirmCancellation, setConfirmCancellation] = useState(false);
  const navigate = useNavigate();
  const helper = useOrders();

  useEffect(() => {
    initData();
  }, [orderId, order?._id]);

  const initData = async () => {
    if (cachedOrder) {
      setOrder(cachedOrder);
    } else {
      if (!orderId) return navigate("/");

      const orderData = await service.getOrder(orderId);
      if (orderData) setOrder(orderData);
    }

    initProducts();
  };

  const initProducts = async () => {
    if (order?.products) setOrderProducts(order.products);
    else {
      if (!orderId) return;

      const retrievedOrder = await service.getOrder(orderId);
      if (retrievedOrder) setOrderProducts(retrievedOrder.products);
    }
  };

  const cancelOrder = async () => {
    if (!orderId) return;

    const res = await helper.updateOrder(orderId, { canceled: true });

    if (res.ok) {
      toast.success("Your order has been canceled successfully");
      window.location.href = window.location.href;
    } else
      toast.error("Your order couldn't be canceled! Something went wrong!");
  };

  const uncancelOrder = async () => {
    if (!orderId) return;

    const res = await helper.updateOrder(orderId, { canceled: false });

    if (res.ok) {
      toast.success("Your order has been restored successfully");
      window.location.href = window.location.href;
    } else
      toast.error("Your order couldn't be restored! Something went wrong!");
  };

  if (!order)
    return (
      <article className="flex justify-center">
        <p className="mr-2">Loading</p>
        <span className="loading loading-dots loading-md " />
      </article>
    );

  const { canceled, message, shop, status } = order;

  return (
    <section className="container mx-auto p-4">
      <Modal
        content="Are you sure you want to cancel this order?"
        isOpen={cofirmCancellation}
        onClose={() => setConfirmCancellation(false)}
        onPrimaryBtnClick={cancelOrder}
        primaryBtnLabel="Yes, Cancel it"
        secondaryBtnLabel="Don't Cancel"
        title="Order Cancellation Confirmation"
      />

      <article className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Order Details</h1>
        {order.canceled ? (
          <button className="btn btn-sm btn-success" onClick={uncancelOrder}>
            Uncancel Order
          </button>
        ) : (
          <button
            className="btn btn-sm btn-error"
            onClick={() => setConfirmCancellation(true)}
          >
            Cancel Order
          </button>
        )}
      </article>

      <article className="card bg-base-100 shadow-md p-4 mt-2">
        <article className="flex mb-4">
          <figure>
            <img
              src={shop.image}
              alt={shop.name}
              className="w-24 h-24 object-cover mr-4"
            />
          </figure>
          <div>
            <h2 className="text-xl font-bold">{order.shop.name}</h2>
            <p>Status: {canceled ? "Canceled" : status.label}</p>
            <p>Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
          </div>
        </article>
        <section>
          {order.message && (
            <article className="mt-4">
              <h3 className="text-lg font-bold mb-2">Message</h3>
              <p>{message}</p>
            </article>
          )}
        </section>
      </article>

      <h3 className="text-lg font-bold mb-2 text-center mt-5">
        Ordered Products
      </h3>
      <Table orderProducts={orderProducts} />
    </section>
  );
};

export default ProfileOrderPage;
