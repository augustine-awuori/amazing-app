import { useState } from "react";
import { BsChat, BsWhatsapp } from "react-icons/bs";

import { funcs } from "../utils";
import { User } from "../hooks/useUser";
import { useUser, useWhatsAppRedirect } from "../hooks";
import BottomToast from "./BottomToast";

interface Props {
  seller: User;
}

const ChatButtons = ({ seller }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const { user } = useUser();
  const { url } = useWhatsAppRedirect(
    seller.otherAccounts?.whatsapp,
    seller.avatar
  );

  const { otherAccounts } = seller;

  const navigateToWhatsAppPage = () => {
    if (otherAccounts?.whatsapp) return funcs.navTo(url);

    setErrorMessage("WhatsApp number not added");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleInAppChat = async () => {
    setErrorMessage("Coming soon...");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

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
