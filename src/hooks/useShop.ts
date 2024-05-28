type Common = {
  location?: string;
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
  types: NewShopTypes;
}

export default {};
