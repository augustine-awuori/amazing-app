import { useContext } from "react";
import { toast } from "react-toastify";

import { NotificationsContext } from "../contexts";
import service from "../services/notifications";

export interface NotificationActivity {
  buyerId: string;
  dataId: string;
  sellerId: string;
  verb: "order";
}

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  const createNotification = async (activity: NotificationActivity) => {
    const res = await service.create(activity);
    if (res.ok) toast.success("Seller is notified");
  };

  return { createNotification, ...context };
};

export default useNotifications;
