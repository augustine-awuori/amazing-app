import { useEffect, useState } from "react";
import { GetUnreadCountAPIResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";
import { useMediaQuery } from "react-responsive";

import Cart from "./Cart";
import EmergencyLoginForm from "../EmergencyLoginForm";
import Logo from "./Logo";
import Modal from "../Modal";
import Notification from "./Notification";
import Tabs from "./Tabs";
import UserButton from "./UserButton";

const NavBar = () => {
  const [emergencyLogin, setEmergencyLogin] = useState(false);
  const currentPath = window.location.pathname;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [countResponse, setCountResponse] =
    useState<GetUnreadCountAPIResponse>();
  const { client } = useChatContext();

  if (isMobile && currentPath.startsWith("/chats")) return null;

  useEffect(() => {
    if (!client) return;

    fetchUnreadCount();

    const handleNewMessage = () => fetchUnreadCount();

    const handleReadMessage = () => fetchUnreadCount();

    client.on("message.new", handleNewMessage);
    client.on("message.read", handleReadMessage);

    return () => {
      client.off("message.new", handleNewMessage);
      client.off("message.read", handleReadMessage);
    };
  }, [client]);

  async function fetchUnreadCount() {
    try {
      if (client) {
        const count = await client.getUnreadCount();
        setCountResponse(count);
      }
    } catch (error) {}
  }

  return (
    <>
      <Modal
        content={<EmergencyLoginForm />}
        isOpen={emergencyLogin}
        onClose={() => setEmergencyLogin(false)}
        title="Emergency Login"
      />
      <nav className="flex-1 navbar bg-base-100 w-full fixed top-0 left-0 right-0 border-b border-gray-100 z-10 glass py-0">
        <Logo />
        <Tabs count={countResponse?.total_unread_count || 0} />
        <article className="flex-none flex items-center space-x-4">
          <Notification />
          <Cart />
          <UserButton onEmergencyLogin={setEmergencyLogin} />
        </article>
      </nav>
    </>
  );
};

export default NavBar;
