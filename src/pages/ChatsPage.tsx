import { useEffect } from "react";
import { ChannelSort } from "stream-chat";
import {
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  DefaultStreamChatGenerics,
  useChatContext,
} from "stream-chat-react";
import { useMediaQuery } from "react-responsive";

import { EmptyStateIndicator } from "../components/chats";
import { useActiveChatId, useShowNav, useUser } from "../hooks";
import NotLoggedInPage from "./NotLoggedInPage";

const options = { presence: true, state: true };
const sort: ChannelSort<DefaultStreamChatGenerics> = {
  last_message_at: -1,
};

const ChatsPage = () => {
  const { user } = useUser();
  const { client, setActiveChannel } = useChatContext();
  const { activeChatId } = useActiveChatId();
  const { setShowNav } = useShowNav();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const createDMChannel = async () => {
      let seller = "";
      const params = new URLSearchParams(window.location.search);
      for (const [key] of params) seller = key;

      if (!user?._id || !seller) return;

      const channel = client.channel("messaging", {
        members: [user?._id, seller],
      });

      await channel.watch();
      setActiveChannel(channel);
    };

    createDMChannel();
  }, []);

  useEffect(() => {
    setShowNav(!isMobile);

    return () => {
      setShowNav(true);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!activeChatId) return;

    const channel = client.channel("messaging", activeChatId);
    channel.watch();

    setActiveChannel(channel);
  }, [activeChatId]);

  if (!user) return <NotLoggedInPage />;
  if (!user.chatToken) return <p>You're not registered for chatting</p>;
  if (!user._id) return <p>Your user ID is missing. Please contact support.</p>;

  if (!client)
    return (
      <article className="flex flex-col items-center justify-center h-screen bg-base-100">
        <article className="flex items-center space-x-2">
          <article className="spinner border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></article>
          <span className="text-lg font-semibold">Loading chats...</span>
        </article>
      </article>
    );

  return (
    <>
      <ChannelList
        sort={sort}
        EmptyStateIndicator={EmptyStateIndicator}
        filters={{ members: { $in: [user._id] }, type: "messaging" }}
        options={options}
        showChannelSearch
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </>
  );
};

export default ChatsPage;
