import { useState } from "react";

import { empty, paginate } from "../utils";
import { Pagination, ProductsGrid } from "../components";
import { Product, ProductType } from "../hooks/useProducts";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [selectedType] = useState<ProductType>(empty.type);
  const [query] = useState("");
  const products: Product[] = [];

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
    <article>
      <ProductsGrid products={paginated} />
      <Pagination
        currentPage={currentPage}
        itemsCount={25}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </article>
  );
};

export default ProductsPage;
