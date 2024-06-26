import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { funcs, paginate } from "../utils";
import {
  CopyUrlButton,
  Input,
  Pagination,
  ProductsGrid,
  ProductTypesList,
  ShopPageHeader,
  ShopStats,
} from "../components";
import { emptyShop as emptyShop, emptyType } from "../utils/empty";
import { Shop } from "../hooks/useShop";
import { useProductTypes, useReload, useShops } from "../hooks";
import ChatButtons from "../components/ChatButtons";
import productsService from "../services/products";
import service from "../services/shops";
import useProducts, { Product, ProductType } from "../hooks/useProducts";

const ShopPage = () => {
  const [selectedType, setSelectedType] = useState<ProductType>({
    _id: "",
    label: "",
  });
  const { types: allTypes } = useProductTypes();
  const [shopTypes, setShopTypes] = useState<ProductType[]>([]);
  const { products: allProducts } = useProducts();
  const { shopName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pageSize] = useState(12);
  const [products, setProducts] = useState<Product[]>([]);
  const helper = useShops();
  const {
    info: shop,
    isLoading,
    request,
  } = useReload<Shop>(
    null,
    { ...emptyShop, paramsId: "shopName" },
    service.getShop,
    true
  );

  const { image, author, types, views } = shop;

  useEffect(() => {
    initData();
    helper.incShopViews(shop._id);
  }, [allTypes.length, products.length, types]);

  const initData = () => {
    // TODO: Check after a while to fetch potentially new products
    if (!shop._id && !isLoading) request();

    const result: ProductType[] = [{ _id: "", label: "All Types" }];
    allTypes.forEach((type) => {
      if (types[type._id]) result.push(type);
    });
    setShopTypes(result);

    getProducts();
  };

  async function getProducts() {
    if (!shopName) return;
    let result: Product[] = [];

    if (allProducts.length)
      allProducts.forEach((p) => {
        if (p.shop.name === funcs.revertUrlToName(shopName)) result.push(p);
      });
    else result = await productsService.getProducts();

    setProducts(result);
  }

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
    setSelectedType(emptyType);
    setQuery(query);
  };

  const handleTypeChange = (type: ProductType) => {
    setQuery("");
    setSelectedType(type);
  };

  return (
    <section>
      <ShopPageHeader shop={shop} />
      <article className="flex justify-center my-4">
        <CopyUrlButton label="Shop" />
      </article>

      <article className="mb-4">
        <ChatButtons seller={author} />
      </article>

      <section className="flex flex-col items-center px-8 pb-6">
        <ShopStats
          productsCount={products.length}
          shopImage={image}
          visits={views}
          seller={author}
        />

        <article className="mt-5">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={handleQueryChange}
          />
        </article>
        <ProductTypesList
          badges={shopTypes}
          onTypeSelect={handleTypeChange}
          selectedType={selectedType}
        />
      </section>
      <ProductsGrid products={paginated} />
      <Pagination
        currentPage={currentPage}
        itemsCount={queried.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </section>
  );
};

export default ShopPage;
