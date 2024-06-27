import { useNavigate } from "react-router-dom";
import { BsCalendar2Check, BsChat } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";

import { useUnreadChats } from "../../hooks";
import CountBadge from "../CountBadge";

const BottomNav = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const { countResponse } = useUnreadChats();

  return (
    <div className="btm-nav md:hidden">
      <button
        className={currentPath.startsWith("/mart") ? "active" : ""}
        onClick={() => navigate("/mart")}
      >
        <HiOutlineHome size={24} />
        <span className="btm-nav-label">Mart</span>
      </button>
      <button
        className={currentPath.startsWith("/events") ? "active" : ""}
        onClick={() => navigate("/events")}
      >
        <BsCalendar2Check size={20} />
        <span className="btm-nav-label">Events</span>
      </button>
      <button
        className={currentPath.startsWith("/chats") ? "active" : ""}
        onClick={() => navigate("/chats")}
      >
        <BsChat size={20} />
        {countResponse?.total_unread_count && (
          <CountBadge
            count={countResponse.total_unread_count}
            right={-10}
            top={-1}
          />
        )}
        <span className="btm-nav-label">Chats</span>
      </button>
    </div>
  );
};

export default BottomNav;
