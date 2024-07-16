import { useNavigate, useLocation } from "react-router-dom";

import CountBadge from "../CountBadge";

interface Props {
  count: number;
}

const Tabs = ({ count }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Don't remove the empty element, it helps in nav alignment */}
      <article className="flex-1 md:hidden" />
      <article className="hidden md:flex flex-1 justify-center space-x-14 relative">
        <p
          onClick={() => navigate("/")}
          className={`cursor-pointer ${
            isActive("/mart") ? "text-blue-500 font-bold" : ""
          }`}
        >
          Mart
        </p>
        <p
          className={`cursor-pointer ${
            isActive("/events") ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => navigate("/events")}
        >
          Events
        </p>
        <p
          className={`cursor-pointer relative ${
            isActive("/chats") ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => navigate("/chats")}
        >
          Chats
          <CountBadge count={count} />
        </p>
      </article>
    </>
  );
};

export default Tabs;
