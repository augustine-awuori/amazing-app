import { useState } from "react";
import { User } from "../hooks/useUser";
import img from "../assets/logo.png";

interface Base {
  title: string;
  description: string;
}

export interface Notification extends Base {
  _id: string;
  from: User;
  read: boolean;
  to: User;
}

export interface NewNotification extends Base {
  to: string;
}

const NotificationComp = ({ description, from, read, title }: Notification) => {
  const [noOfLines, setNoOfLines] = useState(1);

  const color = read ? "text-gray-500" : "text-black";

  return (
    <div className="flex mb-3 px-3">
      <div className="flex-shrink-0 mt-1 mr-3">
        <img
          src={from.avatar || img}
          className="w-9 h-9 rounded-full"
          alt="avatar"
        />
      </div>
      <div>
        <div className={`font-bold ${color}`}>{title}</div>
        <div
          className={`${color} ${noOfLines === 1 ? "line-clamp-1" : ""}`}
          onClick={() => setNoOfLines(noOfLines === 1 ? 10 : 1)}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default NotificationComp;
