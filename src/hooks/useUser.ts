import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";

import { UserContext } from "../contexts";

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
}

import { googleAuth } from "../services/auth";
import { processResponse } from "../services/client";
import usersApi from "../services/users";

export const userSignOut = () => signOut(googleAuth);

export const userSignIn = () =>
  signInWithRedirect(googleAuth, new GoogleAuthProvider());

const useUser = () => {
  const [googleUser] = useAuthState(googleAuth);
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    retrieveUser();
  }, [googleUser?.uid]);

  async function retrieveUser() {
    if (googleUser) {
      const { ok, data } = processResponse(
        await usersApi.register({
          email: googleUser.email || "",
          name: googleUser.displayName || "",
          avatar: googleUser.photoURL || "",
        })
      );

      if (ok) setUser(data as User);
    }
  }

  return { user, googleUser };
};

export default useUser;
