import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cancelledStatus } from "./ShopOrdersPage";
import { emptyStatus } from "../utils/empty";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils";
import { Pagination, ProductTypesList } from "../components";
import { Status } from "../hooks/useStatus";
import { useStatus } from "../hooks";
import OrderCard from "../components/orders/Card";
import service from "../services/orders";

const ProfileOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [orders, setOrders] = useState<Order[]>([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const { status } = useStatus();
  const [selectedStatus, setSelectedStatus] = useState<Status>(emptyStatus);

  useEffect(() => {
    initData();
  }, [userId]);

  const initData = async () => {
    setLoading(true);
    if (userId) setOrders(await service.getShopOrUserOrders(userId));
    setLoading(false);
  };

  const filtered = selectedStatus._id
    ? orders.filter((order) => {
        if (selectedStatus.label === cancelledStatus.label)
          return order.canceled;
        else return order.status._id === selectedStatus._id && !order.canceled;
      })
    : orders;

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  return (
    <section className="px-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        My Orders{" "}
        {loading && <span className="loading loading-dots loading-md" />}
      </h1>
      <ProductTypesList
        badges={[...status, cancelledStatus]}
        onTypeSelect={(item) => setSelectedStatus(item as Status)}
        selectedType={selectedStatus}
      />
      {!paginated.length && !loading && (
        <h2 className="text-xl mt-4 text-center">
          {selectedStatus._id
            ? `${selectedStatus.label} orders not found`
            : "You don't have any orders yet"}
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

export default ProfileOrdersPage;
