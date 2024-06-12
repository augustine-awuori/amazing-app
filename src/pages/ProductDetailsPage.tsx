import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

import { emptyProduct } from "../utils/empty";
import { formatPhoneNumber } from "../utils/funcs";
import { funcs } from "../utils";
import { getShopProducts } from "../services/shops";
import {
  AddRightChevron,
  HorizontalProductList,
  Modal,
  ProductUpdateForm,
  ShoppingCartIcon,
  Slider,
} from "../components";
import { useReload, useUser } from "../hooks";
import service from "../services/products";
import useProducts, { Product } from "../hooks/useProducts";
import useCart from "../hooks/useCart";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cart = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const helper = useProducts();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const { info: product, request } = useReload<Product>(
    null,
    { ...emptyProduct, paramsId: "productId" },
    service.getProduct
  );

  const productInCart = cart.hasProduct(productId || "");

  useEffect(() => {
    prepareProducts();
    funcs.scrollToTop();
  }, [productId, product?._id, currentImageIndex, product?.shop._id]);

  const updateCart = () =>
    productInCart ? cart.remove(productId || "") : cart.add(productId || "");

  const prepareProducts = async () => {
    if (!product?._id || productId !== product._id) request();

    if (product?.shop._id)
      setShopProducts(await getShopProducts(product.shop._id));
  };

  const deleteProduct = async () => {
    if (!productId) return;

    const { ok } = await helper.deleteProductById(productId);
    if (ok) navigate("/");
  };

  if (!product) return <Navigate to="/" />;

  const navigateToShop = () => navigate(`/shops/${product.shop._id}`);

  const { author, description, name, images, shop, type } =
    product || emptyProduct;

  const currentUserIsTheSeller = user?._id === shop.author;

  return (
    <section className="p-4">
      <Modal
        content="Are you sure you want to delete this product permanently?"
        isOpen={confirmDeletion}
        onClose={() => setConfirmDeletion(false)}
        title="Product Deletion"
        primaryBtnLabel="Yes, Delete"
        secondaryBtnLabel="No, Cancel"
        onPrimaryBtnClick={deleteProduct}
      />
      <Modal
        content={
          <ProductUpdateForm
            {...product}
            onDone={() => setIsEditingProduct(false)}
          />
        }
        isOpen={isEditingProduct}
        onClose={() => setIsEditingProduct(false)}
        title="Product Editing"
      />

      <article className="container mx-auto">
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="col-span-1">
            <Slider
              images={images}
              initialIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
            />
          </article>
          <article className="col-span-1">
            <section className="mr-3 flex mb-2">
              {images.length > 1 &&
                images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-md mr-3 object-cover cursor-pointer ${
                      index === currentImageIndex
                        ? "border-blue-500 border-2"
                        : ""
                    }`}
                  />
                ))}
            </section>
            <section className="flex items-center">
              <p className="text-2xl font-bold text-white-800 mb-2">{name}</p>
              <button className="btn btn-ghost btn-xs btn-outline btn-accent ml-2">
                {type.label}
              </button>
            </section>
            <p>{description}</p>
            {currentUserIsTheSeller ? (
              <article className="flex justify-between items-center w-full mt-3">
                <button
                  className="btn btn-secondary flex items-center"
                  style={{ width: "calc(50% - 5px)" }}
                  onClick={() => setIsEditingProduct(true)}
                >
                  <FaEdit className="mr-2" /> Edit Product
                </button>
                <div style={{ width: "10px" }} />
                <button
                  className="btn btn-error flex items-center"
                  style={{ width: "calc(50% - 5px)" }}
                  onClick={() => setConfirmDeletion(true)}
                >
                  <FaTrash className="mr-2" /> Delete Product
                </button>
              </article>
            ) : (
              <button
                className="btn btn-primary btn-block mt-2"
                onClick={updateCart}
              >
                {!productInCart && <ShoppingCartIcon />}
                {productInCart ? (
                  <BsCartCheckFill size={20} />
                ) : (
                  `Ksh ${funcs.addComma(product.price)}`
                )}
              </button>
            )}
            <p className="text-1xl mt-8 font-bold text-white-800">
              {shop?.name} Shop Information
            </p>
            <AddRightChevron
              onClick={() => navigate(`/shops/${product.shop._id}`)}
            >
              <article
                className="flex mt-4 cursor-pointer items-center"
                onClick={navigateToShop}
              >
                <img
                  src={shop?.image}
                  alt={shop?.name}
                  className="w-20 h-20 mr-2 mask mask-hexagon-2 object-cover"
                />
                <article>
                  <p>Location: {shop?.location}</p>
                  <p>Products: {shopProducts.length}</p>
                  <p>Visits: {shop?.views}</p>
                </article>
              </article>
            </AddRightChevron>

            <p className="text-1xl mt-6 font-bold text-white-800">
              Seller Information
            </p>
            <AddRightChevron>
              <article
                className="flex items-center"
                onClick={() => navigate(`/profile/${author._id}`)}
              >
                <figure>
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-20 h-20 mr-2 mask mask-squircle"
                  />
                </figure>
                <article className="flex-grow">
                  <article>
                    <p>Name: {author.name}</p>
                    <p>Email: {author?.email || "Not available"}</p>
                    <p>
                      Phone:{" "}
                      {formatPhoneNumber(author?.otherAccounts?.whatsapp) ||
                        "Not available"}
                    </p>
                  </article>
                </article>
              </article>
            </AddRightChevron>
          </article>
        </article>
      </article>

      {shopProducts.length > 1 && (
        <div className="flex items-center mt-6 mb-4">
          <p className="text-1xl font-bold text-white-800 ">Recommended</p>
          <p
            className="ml-3 cursor-pointer text-secondary"
            onClick={navigateToShop}
          >
            Visit Shop for More
          </p>
        </div>
      )}
      <section>
        <HorizontalProductList
          products={shopProducts
            .slice(0, 2)
            .filter(({ _id }) => product._id !== _id)}
        />
      </section>
    </section>
  );
};

export default ProductDetailsPage;
