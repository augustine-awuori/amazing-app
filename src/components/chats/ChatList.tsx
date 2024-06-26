import React, { useState, useEffect } from "react";
import {
  ChannelOptions,
  ChannelSort,
  UserResponse,
  ChannelFilters,
} from "stream-chat";
import {
  ChannelList,
  useChatContext,
  ChannelSearch,
  LoadingIndicator,
  DefaultStreamChatGenerics,
} from "stream-chat-react";

const ChatList: React.FC = () => {
  const { client, setActiveChannel } = useChatContext();
  const [users, setUsers] = useState<UserResponse<DefaultStreamChatGenerics>[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.queryUsers({
          id: { $ne: client.userID! },
        });
        setUsers(response.users);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [client]);

  const handleUserClick = async (userId: string) => {
    const channel = client.channel("messaging", {
      members: [client.userID!, userId],
    });
    await channel.watch();
    setActiveChannel(channel);
  };

  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters: ChannelFilters<DefaultStreamChatGenerics> = {
    members: { $in: [client.userID!] },
    type: "messaging",
  };

  const sort: ChannelSort<DefaultStreamChatGenerics> = {
    last_message_at: -1,
  };

  const options: ChannelOptions = { presence: true, state: true };

  return (
    <div className="custom-channel-list">
      <ChannelSearch onSearch={(e) => setSearchQuery(e.target.value)} />
      <ChannelList filters={filters} sort={sort} options={options} />
      <div className="user-list">
        <h3 className="text-center mt-4">All Users</h3>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <p>Error loading users: {error}</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-item"
              onClick={() => handleUserClick(user.id)}
            >
              <img src={user.image} alt={user.name} className="user-avatar" />
              <p>{user.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
