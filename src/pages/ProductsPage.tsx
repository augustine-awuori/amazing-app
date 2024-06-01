import { useState } from "react";
import _ from "lodash";

import { empty, paginate } from "../utils";
import {
  Grid,
  Pagination,
  ProductHeader,
  ProductsGrid,
  ProductTypesList,
} from "../components";
import useProduts, { Product, ProductType } from "../hooks/useProducts";
import CardSkeleton from "../components/products/CardSkeleton";
import { useProductTypes } from "../hooks";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [selectedType, setSelectedType] = useState<ProductType>(empty.type);
  const [query, setQuery] = useState("");
  const { isLoading, products } = useProduts();
  const { types } = useProductTypes();

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
      <ProductTypesList
        badges={types}
        onTypeSelect={setSelectedType}
        selectedType={selectedType}
      />
      {query && (
        <h1 className="text-center mt-3">Showing {queried.length} Products</h1>
      )}
      <Grid>
        {isLoading &&
          _.range(1, 13).map((skeleton) => <CardSkeleton key={skeleton} />)}
      </Grid>
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
