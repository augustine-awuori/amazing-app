import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/mart");
  }, []);

  return null;
};

export default RedirectRoot;
