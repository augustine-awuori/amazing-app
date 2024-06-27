import { useEffect, useState } from "react";
import { GetUnreadCountAPIResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";

const useUnreadChats = () => {
  const { client } = useChatContext();
  const [countResponse, setCountResponse] =
    useState<GetUnreadCountAPIResponse>();

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

  return { countResponse };
};

export default useUnreadChats;
