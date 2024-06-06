import { Product, ProductType } from "../hooks/useProducts";
import { Shop, ShopProduct } from "../hooks/useShop";
import { User } from "../hooks/useUser";

const author: User = {
  _id: "",
  aboutMe: "",
  avatar: "",
  isAdmin: false,
  isVerified: false,
  name: "",
  otherAccounts: { whatsapp: "+254745889801" },
  timestamp: 452045,
  username: "",
};

const shop: Shop = {
  _id: "",
  author,
  image: "",
  isVerified: false,
  name: "",
  location: "",
  types: {},
  views: 0,
};

const shopProduct: ShopProduct = {
  ...shop,
  author: "",
  types: {},
};

const product: Product = {
  _id: "",
  author,
  description: "",
  images: [],
  name: "",
  price: 100,
  shop: shopProduct,
  timestamp: 0,
  type: { _id: "", label: "" },
};

const type: ProductType = {
  _id: "",
  label: "All Types",
  icon: undefined,
  rightIcon: undefined,
  route: "",
};

export default {
  product: { ...product, paramsId: "productId" },
  shop: { ...shop, paramsId: "shopId" },
  type,
};
