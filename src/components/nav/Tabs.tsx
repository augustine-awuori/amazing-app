import { useNavigate } from "react-router-dom";

import CountBadge from "../CountBadge";

interface Props {
  count: number;
}

const Tabs = ({ count }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Don't remove the empty element, it helps in nav alignment */}
      <article className="flex-1 md:hidden" />
      <article className="hidden md:flex flex-1 justify-center space-x-14 relative">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Mart
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/events")}>
          Events
        </p>
        <p
          className="cursor-pointer relative"
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
