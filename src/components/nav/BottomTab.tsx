import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface TabProps {
  children?: ReactNode;
  pathname: string;
  Icon: JSX.Element;
  label: string;
}

const BottomTab = ({ children, Icon, label, pathname }: TabProps) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${
        location.pathname.startsWith(pathname) ? "bg-blue-500 text-white" : ""
      }`}
      onClick={() => navigate(pathname)}
    >
      {Icon}
      {children}
      <span className="btm-nav-label">{label}</span>
    </button>
  );
};

export default BottomTab;
