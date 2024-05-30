import { useState } from "react";

import { empty, paginate } from "../utils";
import { Pagination, ProductHeader, ProductsGrid } from "../components";
import useProduts, { Product, ProductType } from "../hooks/useProducts";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [selectedType] = useState<ProductType>(empty.type);
  const [query, setQuery] = useState("");
  const { products } = useProduts();

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
      <ProductHeader
        query={query}
        onQuery={setQuery}
        onProductCreation={console.log}
      />
      {query && (
        <h1 className="text-center mt-3">Showing {queried.length} Products</h1>
      )}
      <ProductsGrid products={paginated} />
      <Pagination
        currentPage={currentPage}
        itemsCount={queried.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </article>
  );
};

export default ProductsPage;
