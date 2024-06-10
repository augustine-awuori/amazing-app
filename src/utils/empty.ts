import { Product, ProductType } from "../hooks/useProducts";
import { randomImage } from "../components/shop/PageHeader";
import { Shop, ShopProduct } from "../hooks/useShop";
import { User } from "../hooks/useUser";

const author: User = {
  _id: "",
  aboutMe: "",
  avatar: randomImage,
  email: "",
  isAdmin: false,
  isVerified: false,
  name: "",
  otherAccounts: { whatsapp: "+254745889801" },
  timestamp: 452045,
};

const shop: Shop = {
  _id: "",
  author,
  image: randomImage,
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
  name: randomImage,
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
  user: { ...author, paramsId: "userId" },
  type,
};
