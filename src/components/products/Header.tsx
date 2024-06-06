import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Input, Modal, ShopSelectors } from "..";
import { useUser } from "../../hooks";

interface Props {
  query: string;
  onQuery: (query: string) => void;
  onProductCreation: () => void;
}

const Header = ({ onQuery, query }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const handleProductCreation = () => {
    if (!user) return toast.info("You're not logged in");

    setShowModal(true);
  };

  const handleShopSelection = () => {
    if (selectedShopId) {
      navigate(selectedShopId);
      return setShowModal(false);
    }

    toast.info("Please select a shop or create a new one");
  };

  const ModalContent = (
    <>
      <p
        className="text-center cursor-pointer mb-2 font-bold"
        onClick={() => {
          setShowModal(false);
          navigate("/shops/new");
        }}
      >
        Create a new shop instead?
      </p>
      <ShopSelectors
        onDoneShopSelect={handleShopSelection}
        onShopSelect={setSelectedShopId}
        selectedShop={selectedShopId}
      />
    </>
  );

  return (
    <header className="max-w-100 mx-auto flex items-center space-x-4 px-5">
      <Modal
        content={ModalContent}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Select Shop"
        primaryBtnLabel="Proceed"
        onPrimaryBtnClick={() => navigate(`/shops/${selectedShopId}`)}
        secondaryBtnLabel="Cancel"
      />
      <div className="relative flex-grow">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={onQuery}
        />
        {query && (
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent text-gray-500"
            onClick={() => onQuery("")}
          >
            X
          </button>
        )}
      </div>
      <button
        onClick={handleProductCreation}
        className="btn btn-primary hidden md:inline"
      >
        New Product
      </button>
      <button
        onClick={handleProductCreation}
        className="btn btn-primary md:hidden"
      >
        &#43;
      </button>
    </header>
  );
};

export default Header;
