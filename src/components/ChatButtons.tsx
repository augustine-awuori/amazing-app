import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { useNavigate } from "react-router-dom";
import { BsChat, BsWhatsapp } from "react-icons/bs";

import { funcs } from "../utils";
import { User } from "../hooks/useUser";
import { useActiveChatId, useUser, useWhatsAppRedirect } from "../hooks";
import BottomToast from "./BottomToast";

interface Props {
  seller: User;
}

const ChatButtons = ({ seller }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const { user } = useUser();
  const { client } = useChatContext();
  const navigate = useNavigate();
  const { setActiveChatId } = useActiveChatId();
  const { url } = useWhatsAppRedirect(
    seller.otherAccounts?.whatsapp,
    seller.avatar
  );

  const { otherAccounts } = seller;

  const navigateToWhatsAppPage = () => {
    if (otherAccounts?.whatsapp) return funcs.navTo(url);

    showMessage("WhatsApp number not added");
  };

  const handleInAppChat = async () => {
    if (!client) return showMessage("Messaging not activated");
    if (!user) return showMessage("You need to login");

    const chatId = funcs.getChatUsersId(user._id, seller._id);
    const newChat = client.channel("messaging", chatId, {
      name: funcs.getChatUsersName(user.name, seller.name),
    });
    await newChat.watch();

    setActiveChatId(chatId);
    navigate("/chats");
  };

  function showMessage(message: string) {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }

  if (user?._id === seller._id) return null;

  return (
    <section className="flex justify-around items-center w-full mt-3">
      {showError && <BottomToast type="error" message={errorMessage} />}
      <article
        className="flex flex-col items-center cursor-pointer"
        onClick={handleInAppChat}
      >
        <BsChat size={32} />
        <p>In-app Chat</p>
      </article>
      <article
        className="flex flex-col items-center cursor-pointer"
        onClick={navigateToWhatsAppPage}
      >
        <BsWhatsapp size={32} />
        <p>{otherAccounts?.whatsapp ? "WhatsApp" : "Not available"}</p>
      </article>
    </section>
  );
};

export default ChatButtons;
