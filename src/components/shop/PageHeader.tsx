import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdPin } from "react-icons/io";
import { BsPencil, BsPlus } from "react-icons/bs";

import { funcs } from "../../utils";
import { Modal, ProductForm } from "..";
import { Shop } from "../../hooks/useShop";
import { useUser } from "../../hooks";
import UpdateForm from "./UpdateForm";

interface Props {
  shop: Shop;
}

const PageHeader = ({ shop }: Props) => {
  const [showProductModal, setProductModal] = useState(false);
  const [showShopModal, setShopModal] = useState(false);
  const { user } = useUser();

  const currentUserIsTheSeller = user?._id === shop.author._id;

  const handleProductCreation = () => {
    if (!currentUserIsTheSeller) return toast.info("You're not the shop owner");
    setProductModal(true);
  };

  const { author, image, name, location } = shop;

  return (
    <section className="mb-6">
      <Modal
        content={<ProductForm onDone={() => setProductModal(false)} />}
        isOpen={showProductModal}
        onClose={() => setProductModal(false)}
        title="New Product"
      />
      <Modal
        content={<UpdateForm {...shop} onDone={() => setShopModal(false)} />}
        isOpen={showShopModal}
        onClose={() => setShopModal(false)}
        title="Update Shop Details"
      />
      <section className="relative w-full">
        <img
          src="https://picsum.photos/1200/300"
          alt="Shop Cover"
          className="w-full h-48 object-cover filter blur-sm rounded-lg"
        />
        <section className="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-black">
          <img
            src={image}
            alt={`${name} Shop`}
            className="mask mask-hexagon-2 w-32 h-32 object-cover"
          />
          <div className="ml-4 text-white">
            <h1 className="text-xl font-bold">
              {funcs.capitalizeFirstLetter(name)}
            </h1>
            <p className="text-sm flex items-center">
              <IoMdPin className="mr-1" /> {location}
            </p>
            <p className="mt-2">Seller: {author.name}</p>
          </div>
        </section>
      </section>
      {currentUserIsTheSeller && (
        <section className="flex justify-center mt-4 mb-2">
          <button
            className="btn btn-primary mx-2"
            onClick={handleProductCreation}
          >
            <BsPlus className="mr-2" />
            Add Product
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => setShopModal(true)}
          >
            <BsPencil className="mr-2" />
            Edit Shop
          </button>
        </section>
      )}
    </section>
  );
};

export default PageHeader;
