import { useState } from "react";

import { Modal, RegisterForm, LoginForm } from "..";
import { useShowNav, useUnreadChats } from "../../hooks";
import Cart from "./Cart";
import Logo from "./Logo";
import Notification from "./Notification";
import Tabs from "./Tabs";
import UserButton from "./UserButton";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { countResponse } = useUnreadChats();
  const { showNav } = useShowNav();

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

      <nav className="flex-1 navbar bg-base-100 w-full fixed top-0 left-0 right-0 border-b border-gray-100 z-10 glass py-0">
        <Logo />
        <Tabs count={countResponse?.total_unread_count || 0} />
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
