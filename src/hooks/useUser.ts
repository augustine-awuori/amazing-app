export interface OtherAccounts {
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

export interface User {
  _id: string;
  aboutMe?: string;
  avatar?: string;
  email?: string;
  chatIds?: { [email: string]: string };
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts: OtherAccounts;
  pushTokens?: { [token: string]: string };
  timestamp: number;
  username: string;
  hasShop?: boolean;
  __v?: number;
}

export default {};
