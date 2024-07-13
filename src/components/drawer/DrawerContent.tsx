import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RiStore2Line,
  RiFileList2Line,
  RiShoppingCart2Line,
  RiCalendarEventLine,
  RiCloseLine,
} from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { BsChat } from "react-icons/bs";

import { useShowDrawer } from "../../hooks";
import logo from "../../assets/logo.png";

const DrawerContent = () => {
  const { setShowDrawer } = useShowDrawer();
  const navigate = useNavigate();
  const currentTab = window.location.pathname;

  const closeDrawer = () => setShowDrawer(false);

  const navigateToProducts = () => {
    closeDrawer();
    navigate("/mart");
  };

  const navigateToShops = () => {
    closeDrawer();
    navigate("/mart/shops");
  };

  const inform = () => {
    closeDrawer();
    toast.info("Coming sooner...");
  };

  const Content = () => {
    if (currentTab.startsWith("/mart"))
      return (
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary" onClick={navigateToProducts}>
            Products
            <RiShoppingCart2Line className="inline-block ml-2" />
          </button>
          <button className="btn btn-warning" onClick={navigateToShops}>
            Shops
            <RiStore2Line className="inline-block ml-2" />
          </button>
          <button className="btn btn-secondary" onClick={inform}>
            Listings
            <RiFileList2Line className="inline-block ml-2" />
          </button>
          <button className="btn btn-accent" onClick={inform}>
            Requests
            <BsChat className="inline-block ml-2 " />
          </button>
        </div>
      );

    return (
      <div className="flex flex-col space-y-2">
        <button className="btn btn-primary" onClick={inform}>
          Events
          <RiCalendarEventLine className="inline-block ml-2" />
        </button>
        <button className="btn btn-secondary" onClick={inform}>
          Posters
          <FaImages className="inline-block ml-2" />
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-6">
        <img src={logo} alt="logo" width={30} height={30} className="ml-2" />
        <p className="text-2xl font-semibold text-white-800">amazing</p>
      </div>

      <section className="h-80">
        <Content />
      </section>

      <div className="flex flex-col space-y-2">
        <button className="btn btn-outline btn-error" onClick={closeDrawer}>
          Close <RiCloseLine className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DrawerContent;
