import { useEffect, useState } from "react";
import { ChannelSort, DefaultGenerics, StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  DefaultStreamChatGenerics,
  LoadingIndicator,
} from "stream-chat-react";

import { useUser } from "../hooks";

const apiKey = "nhum746n7hwy";

const options = { presence: true, state: true };
const sort: ChannelSort<DefaultStreamChatGenerics> | undefined = {
  last_message_at: -1,
};

const ChatsPage = () => {
  const { user } = useUser();
  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();

  useEffect(() => {
    if (!user) return;

    const chatClient = StreamChat.getInstance(apiKey);
    chatClient.connectUser(
      { id: user._id, name: user.name, image: user.avatar },
      user.chatToken
    );

    setClient(chatClient);
  }, []);

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
    <Chat client={client} theme="messaging light">
      <ChannelList
        sort={sort}
        filters={{ members: { $in: [user._id] }, type: "messaging" }}
        options={options}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatsPage;
