import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

import { app } from "../services/auth";

export default {
  auth: getAuth(),
  db: getFirestore(),
  deleteObject,
  getDownloadURL,
  ref,
  signInWithEmailAndPassword,
  storage: getStorage(app),
  uploadBytes,
};
