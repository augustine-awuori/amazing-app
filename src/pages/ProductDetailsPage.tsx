import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { empty, funcs } from "../utils";
import { ShoppingCartIcon, Slider } from "../components";
import { useReload } from "../hooks";
import service from "../services/products";

const ProductDetailsPage = () => {
  const { info: product, request } = useReload(
    null,
    empty.product,
    service.getProduct
  );

  useEffect(() => {
    request();
  }, []);

  if (!product) return <Navigate to="/" />;

  return (
    <div className="container mx-auto p-4">
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
          <p className="text-1xl mt-4 font-bold text-white-800">
            Shop Information
          </p>
          <div className="flex mt-4 cursor-pointer">
            <img
              src={product.shop?.image}
              alt={product.shop?.name}
              className="w-20 h-20 mr-2 rounded-md object-cover"
            />
            <div>
              <p>Name: {product.shop?.name}</p>
              <p>Location: {product.shop?.location}</p>
              <p>Views: {product.shop?.views}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
