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
  LoadingIndicator,
  useChatContext,
} from "stream-chat-react";
import { useMediaQuery } from "react-responsive";

import { useActiveChatId, useShowNav, useUser } from "../hooks";

const options = { presence: true, state: true };
const sort: ChannelSort<DefaultStreamChatGenerics> | undefined = {
  last_message_at: -1,
};

const ChatsPage = () => {
  const { user } = useUser();
  const { client, setActiveChannel } = useChatContext();
  const { activeChatId } = useActiveChatId();
  const { setShowNav } = useShowNav();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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

  if (!user) return <p>You're not logged in. You need to log in</p>;
  if (!user.chatToken) return <p>You're not registered for chatting</p>;
  if (!user._id) return <p>Your user ID is missing. Please contact support.</p>;

  if (!client)
    return (
      <>
        <LoadingIndicator />
        <p>Loading chats...</p>
      </>
    );

  return (
    <>
      <ChannelList
        sort={sort}
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
