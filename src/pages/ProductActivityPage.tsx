import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Product } from "../hooks/useProducts";
import { useProducts } from "../hooks";
import service from "../services/products";
import ViewerList from "../components/activity/ViewerList";

const ProductActivityPage: React.FC = () => {
  const { findById } = useProducts();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    initProduct();
  }, []);

  const initProduct = async () => {
    const cached = findById(productId);
    if (cached) return setProduct(cached);

    const res = await service.getProduct(productId || "");
    if (res.ok) setProduct(res.data as Product);
  };

  return (
    <section className="p-4">
      <h1 className="text-center font-bold text-xl">{product?.name}</h1>
      <h2 className="text-center my-2">Users who've seen this product</h2>
      <ViewerList viewers={product?.views || []} />
      {!product?.views?.length && <p className="text-center">None</p>}
    </section>
  );
};

export default ProductActivityPage;
