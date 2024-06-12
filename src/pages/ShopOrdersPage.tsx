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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, [shopId]);

  const initData = async () => {
    setLoading(true);
    if (shopId) setOrders(await service.getShopOrUserOrders(shopId));
    setLoading(false);
  };

  const paginated = paginate<Order>(orders, currentPage, pageSize);

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Shop Orders{" "}
        {loading && <span className="loading loading-dots loading-md" />}
      </h1>
      {!paginated.length && !loading && (
        <h2 className="text-xl mt-4 text-center">
          You don't have any orders yet
        </h2>
      )}
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
