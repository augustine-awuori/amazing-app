import { useState } from "react";

import { LoginForm, Modal, RegisterForm } from "../components";

const NotLoggedInPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const switchToSignUp = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const switchToSignIn = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
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

      <div className="max-w-md mx-auto p-8  rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">
          You're not logged in
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Please log in to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <p
            className="btn btn-primary py-2 px-4 text-white rounded-lg hover:bg-primary-dark"
            onClick={() => setShowLoginForm(true)}
          >
            Sign In
          </p>
          <p
            className="btn btn-secondary py-2 px-4 text-white rounded-lg hover:bg-secondary-dark"
            onClick={() => setShowRegisterForm(true)}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedInPage;
