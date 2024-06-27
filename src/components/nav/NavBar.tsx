import { useState } from "react";

import { useShowNav, useUnreadChats } from "../../hooks";
import Cart from "./Cart";
import EmergencyLoginForm from "../EmergencyLoginForm";
import Logo from "./Logo";
import Modal from "../Modal";
import Notification from "./Notification";
import Tabs from "./Tabs";
import UserButton from "./UserButton";

const NavBar = () => {
  const [emergencyLogin, setEmergencyLogin] = useState(false);
  const { countResponse } = useUnreadChats();
  const { showNav } = useShowNav();

  if (!showNav) return null;

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
