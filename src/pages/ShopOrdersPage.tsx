import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Order } from "../hooks/useOrder";
import { paginate } from "../utils";
import { Pagination } from "../components";
import OrderCard from "../components/orders/Card";
import service from "../services/orders";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [orders, setOrders] = useState<Order[]>([]);
  const { shopId } = useParams();

  useEffect(() => {
    initData();
  }, [shopId]);

  const initData = async () => {
    if (shopId) setOrders(await service.getShopOrders(shopId));
  };

  const paginated = paginate<Order>(orders, currentPage, pageSize);

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Shop Orders</h1>
      {paginated.map((order) => (
        <OrderCard key={order._id} {...order} />
      ))}
      <Pagination
        currentPage={currentPage}
        itemsCount={orders.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </section>
  );
};

export default OrdersPage;
