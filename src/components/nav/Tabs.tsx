import { useNavigate } from "react-router-dom";

const Tabs = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Don't remove the empty element, it's helps in nav alignment */}
      <div className="flex-1 md:hidden" />
      <div className="hidden md:flex flex-1 justify-center space-x-14">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Mart
        </p>
        <p className="cursor-pointer">Events</p>
        <p className="cursor-pointer">Chats</p>
      </div>
    </>
  );
};

export default Tabs;
