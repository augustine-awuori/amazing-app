import { Product, ProductType } from "../hooks/useProducts";
import { Shop, ShopProduct } from "../hooks/useShop";
import { User } from "../hooks/useUser";
import { Status } from "../hooks/useStatus";

export const emptyStatus: Status = { _id: "", color: "orange", label: "All" };

const randomImage = "https://picsum.photos/1200/300";

export const emptyAuthor: User = {
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

export const emptyShop: Shop = {
  _id: "",
  author: emptyAuthor,
  image: randomImage,
  isVerified: false,
  name: "",
  location: "",
  types: {},
  views: 0,
};

export const emptyShopProduct: ShopProduct = {
  ...emptyShop,
  author: "",
  types: {},
};

export const emptyProduct: Product = {
  _id: "",
  author: emptyAuthor,
  description: "",
  images: [randomImage],
  name: "",
  price: 100,
  shop: emptyShopProduct,
  timestamp: 0,
  type: { _id: "", label: "" },
};

export const emptyType: ProductType = {
  _id: "",
  label: "All Types",
  icon: undefined,
  rightIcon: undefined,
  route: "",
};
