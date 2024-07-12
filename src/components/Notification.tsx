import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../hooks/useUser";

export interface Notification {
  _id: string;
  buyer: User;
  dataId: string;
  isRead: boolean;
  seller: User;
  verb: "order";
}

const NotificationComp = ({ buyer, dataId, isRead: read }: Notification) => {
  const [noOfLines, setNoOfLines] = useState(1);
  const navigate = useNavigate();

  const color = read ? "text-gray-500" : "text-black";

  return (
    <article
      className="flex mb-3 px-3"
      onClick={() => navigate(`/mart/shops/unknown/orders/${dataId}`)}
    >
      <figure className="flex-shrink-0 mt-1 mr-3">
        <img src={buyer.avatar} className="w-9 h-9 rounded-full" alt="avatar" />
      </figure>
      <div>
        <div className={`font-bold ${color}`}>New Order</div>
        <div
          className={`${color} ${noOfLines === 1 ? "line-clamp-1" : ""}`}
          onClick={() => setNoOfLines(noOfLines === 1 ? 10 : 1)}
        >
          {buyer.name} has placed an order to your shop.
        </div>
      </div>
    </article>
  );
};

export default NotificationComp;
