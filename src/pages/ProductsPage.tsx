import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { paginate } from "../utils";
import {
  CardSkeletons,
  Modal,
  Pagination,
  ProductForm,
  ProductHeader,
  ProductsGrid,
  ProductTypesList,
  ShopSelectors,
} from "../components";
import { useProductTypes } from "../hooks";
import useProduts, { Product, ProductType } from "../hooks/useProducts";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [query, setQuery] = useState("");
  const { isLoading, products } = useProduts();
  const { types } = useProductTypes();
  const [showModal, setShowModal] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState("");
  const navigate = useNavigate();
  const [showProductModal, setProductModal] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType>({
    _id: "",
    label: "",
  });

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

  const handleQueryChange = (query: string) => {
    setSelectedType({ _id: "", label: "" });
    setQuery(query);
  };

  const handleTypeChange = (type: ProductType) => {
    setQuery("");
    setSelectedType(type);
  };

  const showShops = () => setShowModal(true);

  const handleShopSelection = () => {
    if (selectedShopId) {
      navigate(`shops/${selectedShopId}`);
      return setShowModal(false);
    }

    toast.info("Please select a shop or create a new one");
  };

  const handleProductCreation = () => {
    if (selectedShopId) {
      setProductModal(true);
      setShowModal(false);
    }
  };

  const ModalContent = (
    <>
      <p
        className="text-center cursor-pointer mb-2 font-bold"
        onClick={() => {
          setShowModal(false);
          navigate("shops/new");
        }}
      >
        Create a new shop instead?
      </p>
      <ShopSelectors
        onDoneShopSelect={handleShopSelection}
        onShopSelect={setSelectedShopId}
        selectedShop={selectedShopId}
      />
    </>
  );

  return (
    <article>
      <Modal
        content={ModalContent}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Select Shop"
        primaryBtnLabel="Proceed"
        onPrimaryBtnClick={handleProductCreation}
        secondaryBtnLabel="Cancel"
      />
      <Modal
        content={
          <ProductForm
            onDone={() => setProductModal(false)}
            shopId={selectedShopId}
          />
        }
        isOpen={showProductModal}
        onClose={() => setProductModal(false)}
        title="New Product"
      />
      <ProductHeader
        placeholder="Products"
        query={query}
        onQuery={handleQueryChange}
        onButtonClick={showShops}
      />
      <ProductTypesList
        badges={types}
        onTypeSelect={handleTypeChange}
        selectedType={selectedType}
      />
      {query && (
        <h1 className="text-center mt-3">Showing {queried.length} Products</h1>
      )}
      {!filtered.length && !isLoading && (
        <h1 className="text-center mt-3">
          Found none of {selectedType.label} Products
        </h1>
      )}
      <CardSkeletons isLoading={isLoading} pageSize={pageSize} />
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
