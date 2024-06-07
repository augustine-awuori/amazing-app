import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { empty, paginate } from "../utils";
import {
  Input,
  Pagination,
  ProductsGrid,
  ProductTypesList,
  ShopPageHeader,
  ShopStats,
} from "../components";
import useProducts, { Product, ProductType } from "../hooks/useProducts";
import { Shop } from "../hooks/useShop";
import { useProductTypes, useReload, useShops } from "../hooks";
import productsService from "../services/products";
import service from "../services/shops";

const ShopPage = () => {
  const [selectedType, setSelectedType] = useState<ProductType>(empty.type);
  const { types: allTypes } = useProductTypes();
  const [shopTypes, setShopTypes] = useState<ProductType[]>([]);
  const { products: allProducts } = useProducts();
  const { shopId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pageSize] = useState(12);
  const [products, setProducts] = useState<Product[]>([]);
  const helper = useShops();
  const {
    info: shop,
    isLoading,
    request,
  } = useReload<Shop>(null, empty.shop, service.getShop);

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
    let result: Product[] = [];

    if (allProducts.length)
      allProducts.forEach((p) => {
        if (p.shop._id === shopId) result.push(p);
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
    setSelectedType(empty.type);
    setQuery(query);
  };

  const handleTypeChange = (type: ProductType) => {
    setQuery("");
    setSelectedType(type);
  };

  return (
    <section>
      <ShopPageHeader shop={shop} />
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
