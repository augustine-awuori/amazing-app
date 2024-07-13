import { useNavigate } from "react-router-dom";

import { useShowDrawer } from "../../hooks";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

const DrawerContent = () => {
  const { setShowDrawer } = useShowDrawer();
  const navigate = useNavigate();
  const currentTab = window.location.pathname;

  const closeDrawer = () => setShowDrawer(false);

  const navigateToProducts = () => {
    closeDrawer();
    navigate(currentTab);
  };

  const inform = () => {
    closeDrawer();
    toast.info("Comming sooner");
  };

  const Content = () => {
    if (currentTab === "/mart")
      return (
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary" onClick={navigateToProducts}>
            Products
          </button>
          <button className="btn btn-secondary" onClick={inform}>
            Listings
          </button>
          <button className="btn btn-accent" onClick={inform}>
            Requests
          </button>
        </div>
      );

    return (
      <div className="flex flex-col space-y-2">
        <button className="btn btn-primary" onClick={inform}>
          Events
        </button>
        <button className="btn btn-secondary" onClick={inform}>
          Posters
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-6">
        <img src={logo} alt="logo" width={30} height={30} className="mr-2" />
        <p className="text-2xl font-semibold text-white-800">amazing</p>
      </div>
      <Content />
    </div>
  );
};

export default DrawerContent;
