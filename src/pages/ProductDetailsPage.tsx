import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";

import { empty, funcs } from "../utils";
import { formatPhoneNumber } from "../utils/funcs";
import { getShopProducts } from "../services/shops";
import { Product } from "../hooks/useProducts";
import {
  AddRightChevron,
  HorizontalProductList,
  Image,
  ShoppingCartIcon,
  Slider,
} from "../components";
import { useReload } from "../hooks";
import service from "../services/products";
import useCart from "../hooks/useCart";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cart = useCart();
  const { info: product, request } = useReload(
    null,
    empty.product,
    service.getProduct
  );

  const productInCart = cart.hasProduct(productId || "");

  useEffect(() => {
    prepareProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, product?._id]);

  const updateCart = () =>
    productInCart ? cart.remove(productId || "") : cart.add(productId || "");

  const prepareProducts = async () => {
    request();

    if (product?._id) setShopProducts(await getShopProducts(product.shop._id));
  };

  if (!product) return <Navigate to="/" />;

  const { author, description, name, images, shop } = product;

  return (
    <section className="p-4">
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
            <p className="text-2xl font-bold text-white-800 mb-2">{name}</p>
            <p>{description}</p>
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
            <p className="text-1xl mt-8 font-bold text-white-800">
              {shop?.name} Shop Information
            </p>
            <AddRightChevron>
              <article className="flex mt-4 cursor-pointer items-center">
                <img
                  src={shop?.image}
                  alt={shop?.name}
                  className="w-20 h-20 mr-2 rounded-md object-cover"
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
              <article className="flex items-center">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 mr-2"
                />
                <article className="flex-grow">
                  <article>
                    <p>Name: {author.name}</p>
                    <p>Email: {author?.email || "Not available"}</p>
                    <p>
                      Phone:{" "}
                      {formatPhoneNumber(author?.otherAccounts.whatsapp) ||
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
        <>
          <p className="text-1xl font-bold text-white-800 mt-6 mb-4">
            Recommended (from the same seller)
          </p>
          <section>
            <HorizontalProductList
              products={shopProducts.filter(({ _id }) => product._id !== _id)}
            />
          </section>
        </>
      )}
    </section>
  );
};

export default ProductDetailsPage;
