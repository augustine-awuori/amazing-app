import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useOrder, { Order, OrderProducts } from "../hooks/useOrder";
import service from "../services/orders";
import Table from "../components/orders/Table";

const ProfileOrderPage = () => {
  const { orderId } = useParams();
  const { order: cachedOrder } = useOrder();
  const [order, setOrder] = useState<Order>();
  const [orderProducts, setOrderProducts] = useState<OrderProducts>({});
  const navigate = useNavigate();

  useEffect(() => {
    initData();
  }, [orderId, order?._id]);

  const initData = async () => {
    if (cachedOrder) {
      setOrder(cachedOrder);
    } else {
      if (!orderId) return navigate("/");

      const orderData = await service.getOrder(orderId);
      if (orderData) {
        setOrder(orderData);
      }
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

  if (!order)
    return (
      <article className="flex justify-center">
        <p className="mr-2">Loading</p>
        <span className="loading loading-dots loading-md " />
      </article>
    );

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="card bg-base-100 shadow-md p-4 mt-2">
        <div className="flex mb-4">
          <img
            src={order.shop.image}
            alt={order.shop.name}
            className="w-24 h-24 object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{order.shop.name}</h2>
            <p>Status: {order.status.label}</p>
            <p>Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
          </div>
        </div>
        <div>
          {order.message && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Message</h3>
              <p>{order.message}</p>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 text-center mt-5">
        Ordered Products
      </h3>
      <Table orderProducts={orderProducts} />
    </section>
  );
};

export default ProfileOrderPage;
