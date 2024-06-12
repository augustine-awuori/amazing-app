import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Order } from "../hooks/useOrder";
import { Pagination } from "../components";
import { paginate } from "../utils";
import OrderCard from "../components/orders/Card";
import service from "../services/orders";

const ProfileOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [orders, setOrders] = useState<Order[]>([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, [userId]);

  const initData = async () => {
    setLoading(true);
    if (userId) setOrders(await service.getShopOrUserOrders(userId));
    setLoading(false);
  };

  const paginated = paginate<Order>(orders, currentPage, pageSize);

  return (
    <section className="px-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        My Orders{" "}
        {loading && <span className="loading loading-dots loading-md" />}
      </h1>

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

export default ProfileOrdersPage;
