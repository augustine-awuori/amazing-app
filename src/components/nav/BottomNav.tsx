import { BsCalendar2Check, BsChat } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";

import { useUnreadChats } from "../../hooks";
import BottomTab from "./BottomTab";
import CountBadge from "../CountBadge";

const BottomNav = () => {
  const { countResponse } = useUnreadChats();

  return (
    <div className="btm-nav md:hidden">
      <BottomTab
        Icon={<HiOutlineHome size={24} />}
        label="Mart"
        pathname="/mart"
      />

      <BottomTab
        Icon={<BsCalendar2Check size={20} />}
        label="Events"
        pathname="/events"
      />

      <BottomTab
        children={
          <CountBadge
            count={countResponse?.total_unread_count || 0}
            right={-10}
            top={-1}
          />
        }
        Icon={<BsChat size={20} />}
        label="Chats"
        pathname="/chats"
      />
    </div>
  );
};

export default BottomNav;
