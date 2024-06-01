import { useEffect, useState } from "react";

import { ProductType } from "../components/products/TypesList";
import service from "../services/productTypes";

const useProductTypes = () => {
  const [types, setTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setTypes([{ _id: "", label: "All" }, ...(await service.getProductTypes())]);
  }

  return { types };
};

export default useProductTypes;
