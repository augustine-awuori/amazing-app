import { User } from "./useUser";

type Common = {
  location: string;
  name: string;
};

type ShopBase = {
  _id: string;
  image: string;
  isVerified: boolean;
};

export type NewShopTypes = {
  [id: string]: string;
};

export interface ShopProduct extends Common, ShopBase {
  author: string;
  types: NewShopTypes | null;
  views: number;
}

export interface Shop extends Common, ShopBase {
  author: User;
  types: NewShopTypes;
  views: number;
}

export interface NewShop extends UpdatableShopInfo {
  image: string;
}

export interface UpdatableShopInfo extends Common {
  types: NewShopTypes;
}
