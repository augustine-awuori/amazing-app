import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Modal, RegisterForm, LoginForm } from "..";
import { useShowDrawer, useShowNav, useUnreadChats } from "../../hooks";
import Cart from "./Cart";
import Notification from "./Notification";
import Tabs from "./Tabs";
import UserButton from "./UserButton";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { countResponse } = useUnreadChats();
  const { showNav } = useShowNav();
  const { setShowDrawer } = useShowDrawer();
  const navigate = useNavigate();

  if (!showNav) return null;

  const switchToSignUp = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const switchToSignIn = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  return (
    <>
      <Modal
        content={<LoginForm onSignUpRequest={switchToSignUp} />}
        isOpen={showLoginForm}
        onClose={() => setShowLoginForm(false)}
        title=""
      />
      <Modal
        content={<RegisterForm onLoginRequest={switchToSignIn} />}
        isOpen={showRegisterForm}
        onClose={() => setShowRegisterForm(false)}
        title=""
      />

      <nav className="flex justify-between items-center navbar bg-base-100 w-full fixed top-0 left-0 right-0 border-b border-gray-100 z-10 glass py-0">
        <HiMenuAlt1
          size={25}
          cursor="pointer"
          onClick={() => setShowDrawer(true)}
        />
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="App logo"
          className="w-8 absolute left-1/2 transform -translate-x-1/2 md:hidden"
        />
        <div className="flex-1 flex justify-center md:justify-end">
          <Tabs count={countResponse?.total_unread_count || 0} />
        </div>
        <article className="flex-none flex items-center">
          <Notification />
          <Cart />
          <UserButton onLoginWithForms={setShowLoginForm} />
        </article>
      </nav>
    </>
  );
};

export default NavBar;
