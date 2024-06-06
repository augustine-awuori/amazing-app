import { useEffect, useState } from "react";

import { ProductType } from "../components/products/TypesList";
import service from "../services/productTypes";

const useProductTypes = () => {
  const [types, setTypes] = useState<ProductType[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!types.length) init();
  }, []);

  async function init() {
    setLoading(true);
    setTypes([{ _id: "", label: "All" }, ...(await service.getProductTypes())]);
    setLoading(false);
  }

  return { isLoading, types };
};

export default useProductTypes;
