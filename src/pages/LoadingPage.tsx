import React from "react";

import logo from "../assets/logo.png";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-900">
      <figure>
        <img src={logo} alt="Loading" className="w-20 h-20" />
        <p className="text-center mt-1">Amazing</p>
      </figure>
    </div>
  );
};

export default LoadingPage;
