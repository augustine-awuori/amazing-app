import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={logo} alt="App logo" className="w-8 mr-1" />
      <a className="text-3xl font-bold">amazing</a>
    </div>
  );
};

export default Logo;
