import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { UserContext } from "../contexts";
import { googleAuth, GoogleUser } from "../services/auth";

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
  chatToken?: string;
  email: string;
  chatIds?: { [email: string]: string };
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts?: OtherAccounts;
  pushTokens?: { [token: string]: string };
  timestamp: number;
}

const useUser = (): {
  user: User | undefined;
  googleUser: null | GoogleUser | undefined;
  setUser: (user: User) => void;
} => {
  const context = useContext(UserContext);
  const [googleUser] = useAuthState(googleAuth);

  return { ...context, googleUser };
};

export default useUser;
