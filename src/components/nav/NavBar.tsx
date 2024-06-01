import { useNavigate } from "react-router-dom";

import UserButton from "./UserButton";
import Cart from "./Cart";
import Notification from "./Notification";
import Logo from "./Logo";
import Tabs from "./Tabs";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex-1 navbar bg-base-100 w-full fixed top-0 left-0 right-0 border-b border-gray-100 z-10">
      <Logo />
      <Tabs />
      <div className="flex-none flex items-center space-x-4">
        <Notification />
        <Cart />
        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
