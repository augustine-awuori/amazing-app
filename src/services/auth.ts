import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as googleSignOut,
  User,
} from "firebase/auth";
import { jwtDecode } from "jwt-decode";

// import usersService from "./users";
import { User as AppUser } from "../hooks/useUser";

const tokenKey = "token";

export interface GoogleUser extends User {}

const firebaseConfig = {
  apiKey: "AIzaSyCAtitgurCoK8LIYRWfo2i95Q6otoTmXSA",
  authDomain: "kisii-campus-mart-site.firebaseapp.com",
  projectId: "kisii-campus-mart-site",
  storageBucket: "kisii-campus-mart-site.appspot.com",
  messagingSenderId: "66759292374",
  appId: "1:66759292374:web:2a09e7ad0919c6a056e077",
  measurementId: "G-C2MJ2XQDCQ",
};

export const app = initializeApp(firebaseConfig);
export const googleAuth = getAuth(app);

export async function saveUserWhenIsNot(user: GoogleUser | null | undefined) {
  if (!user || !user.email || !user.displayName) return;

  const { displayName, email, photoURL } = user;
  //   await usersService.create({
  //     avatar: photoURL || "",
  //     email,
  //     name: displayName,
  //   });
}

const getJwt = () => localStorage.getItem(tokenKey);

const getCurrentUserFromCache = () => {
  try {
    const jwt = getJwt();
    if (jwt) {
      const user: AppUser | null = jwtDecode(jwt);
      return user;
    }
  } catch (error) {
    return null;
  }
};

const logout = () => localStorage.removeItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

export const signInWithGoogle = () =>
  signInWithRedirect(googleAuth, new GoogleAuthProvider());

export const signOut = async () => await googleSignOut(googleAuth);

export default {
  app,
  getCurrentUserFromCache,
  getJwt,
  loginWithJwt,
  logout,
  signInWithGoogle,
  signOut,
};
