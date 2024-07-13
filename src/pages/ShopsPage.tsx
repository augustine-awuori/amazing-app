import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CardSkeletons,
  Pagination,
  ProductHeader,
  ProductTypesList,
} from "../components";
import { paginate } from "../utils";
import { ProductType } from "../hooks/useProducts";
import { Shop } from "../hooks/useShop";
import { useProductTypes, useShops } from "../hooks";
import ShopsGrid from "../components/shop/ShopsGrid";

const ShopsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const { types } = useProductTypes();
  const { shops, isLoading } = useShops();
  const [pageSize] = useState(12);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ProductType>({
    _id: "",
    label: "",
  });

  const handleQueryChange = (query: string) => {
    setSelectedType({ _id: "", label: "" });
    setQuery(query);
  };

  const handleTypeChange = (type: ProductType) => {
    setQuery("");
    setSelectedType(type);
  };

  const filtered = selectedType?._id
    ? shops.filter((s) => s.types?.[selectedType._id])
    : shops;

  const queried = query
    ? filtered.filter((shop) =>
        shop.name.toLowerCase().includes(query.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Shop>(queried, currentPage, pageSize);

  return (
    <article>
      <ProductHeader
        placeholder="Shops"
        query={query}
        onQuery={handleQueryChange}
        onButtonClick={() => navigate("new")}
      />
      <ProductTypesList
        badges={types}
        onTypeSelect={handleTypeChange}
        selectedType={selectedType}
      />
      {query && (
        <h1 className="text-center mt-3">Showing {queried.length} Shops</h1>
      )}
      {!filtered.length && !isLoading && (
        <h1 className="text-center mt-3">
          Found none of {selectedType.label} Shops
        </h1>
      )}
      <CardSkeletons isLoading={isLoading} pageSize={pageSize} />
      <ShopsGrid shops={paginated} />
      <Pagination
        currentPage={currentPage}
        itemsCount={queried.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </article>
  );
};

export default ShopsPage;
