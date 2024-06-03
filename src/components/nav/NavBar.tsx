import Cart from "./Cart";
import Logo from "./Logo";
import Notification from "./Notification";
import Tabs from "./Tabs";
import UserButton from "./UserButton";

const NavBar = () => {
  return (
    <nav className="flex-1 navbar bg-base-100 w-full fixed top-0 left-0 right-0 border-b border-gray-100 z-10">
      <Logo />
      <Tabs />
      <article className="flex-none flex items-center space-x-4">
        <Notification />
        <Cart />
        <UserButton />
      </article>
    </nav>
  );
};

export default NavBar;
