import { useState } from "react";

import { empty } from "../utils";
import { paginate, products } from "../utils/paginate";
import { Pagination, ProductsGrid } from "../components";
import { ProductType } from "../hooks/useProductTypes";
import {
  // useProducts,
  Product,
} from "../hooks/useProducts";

const ProductsPage = () => {
  const [query] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [selectedType] = useState<ProductType>(empty.type);
  //   const { products } = useProducts();

  const filtered = selectedType?._id
    ? products.filter(({ shop, type }) =>
        type ? type._id === selectedType?._id : shop?.types?.[selectedType._id]
      )
    : products;

  const queried = query
    ? filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Product>(queried, currentPage, pageSize);

  return (
    <>
      <ProductsGrid products={paginated} />
      <Pagination
        currentPage={currentPage}
        itemsCount={queried.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default ProductsPage;
