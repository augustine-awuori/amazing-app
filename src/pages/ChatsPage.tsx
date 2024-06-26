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

import { useUser } from "../hooks";

const options = { presence: true, state: true };
const sort: ChannelSort<DefaultStreamChatGenerics> | undefined = {
  last_message_at: -1,
};

const ChatsPage = () => {
  const { user } = useUser();
  const { client } = useChatContext();

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
