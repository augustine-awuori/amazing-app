import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { emptyStatus } from "../utils/empty";
import { processResponse } from "../services/client";
import { ProductTypesList } from "../components";
import { Status } from "../hooks/useStatus";
import { useOrders, useStatus } from "../hooks";
import service from "../services/orders";
import Table from "../components/orders/Table";
import useOrder, { Order, OrderProducts } from "../hooks/useOrder";

const ShopOrderPage = () => {
  const { orderId } = useParams();
  const { order: cachedOrder } = useOrder();
  const [order, setOrder] = useState<Order>();
  const [orderProducts, setOrderProducts] = useState<OrderProducts>({});
  const { data } = useStatus();
  const [selectedStatus, setSelectedStatus] = useState<Status>(emptyStatus);
  const navigate = useNavigate();
  const helper = useOrders();

  useEffect(() => {
    initData();
  }, [orderId, order?._id]);

  const initData = async () => {
    if (cachedOrder) {
      setOrder(cachedOrder);
      setSelectedStatus(cachedOrder.status);
    } else {
      if (!orderId) return navigate("/");

      const orderData = await service.getOrder(orderId);
      if (orderData) {
        setOrder(orderData);
        setSelectedStatus(orderData.status);
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

  const handleStatusSelect = async (status: Status) => {
    const prevStatus = selectedStatus;

    setSelectedStatus(status);
    if (!orderId) return;
    const { ok } = await helper.updateOrder(orderId, { status: status._id });
    if (!ok) return setSelectedStatus(prevStatus);
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
      {order.canceled ? (
        <p className="text-red-600 font-bold text-xl">
          This order has been canceled by the buyer
        </p>
      ) : (
        <>
          <p>Info Tip: Tap on Status to change the order status</p>
          <ProductTypesList
            badges={data || []}
            onTypeSelect={(type) => handleStatusSelect(type as Status)}
            selectedType={selectedStatus}
          />
        </>
      )}
      <div className="card bg-base-100 shadow-md p-4 mt-2">
        <div className="flex mb-4">
          <img
            src={order.buyer.avatar}
            alt={order.buyer.name}
            className="w-24 h-24 object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{order.buyer.name}</h2>
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

export default ShopOrderPage;
