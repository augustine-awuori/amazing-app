import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { empty, funcs } from "../utils";
import { getShopProducts } from "../services/shops";
import { Product } from "../hooks/useProducts";
import { HorizontalProductList, ShoppingCartIcon, Slider } from "../components";
import { useReload } from "../hooks";
import service from "../services/products";

const ProductDetailsPage = () => {
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const { info: product, request } = useReload(
    null,
    empty.product,
    service.getProduct
  );

  useEffect(() => {
    prepareProducts();
  }, [product?._id]);

  const prepareProducts = async () => {
    if (!product?._id) return request();

    setShopProducts(await getShopProducts(product.shop._id));
  };

  if (!product) return <Navigate to="/" />;

  return (
    <section className="p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <Slider images={product?.images} />
          </div>
          <div className="col-span-1">
            <p className="text-2xl font-bold text-white-800 mb-2">
              {product.name}
            </p>
            <p>{product.description}</p>
            <button className="btn btn-primary btn-block mt-2">
              <ShoppingCartIcon />
              Ksh {funcs.addComma(product.price)}
            </button>
            <p className="text-1xl mt-8 font-bold text-white-800">
              {product.shop?.name} Shop Information
            </p>
            <div className="flex mt-4 cursor-pointer">
              <img
                src={product.shop?.image}
                alt={product.shop?.name}
                className="w-20 h-20 mr-2 rounded-md object-cover"
              />
              <div>
                <p>Location: {product.shop?.location}</p>
                <p>Views: {product.shop?.views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {shopProducts.length > 1 && (
        <>
          <p className="text-1xl font-bold text-white-800 mt-6 mb-4">
            More products from the same shop
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
