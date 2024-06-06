import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

import { app } from "../services/auth";

const messaging = getMessaging(app);

export default {
  auth: getAuth(),
  db: getFirestore(),
  deleteObject,
  getDownloadURL,
  messaging,
  ref,
  signInWithEmailAndPassword,
  storage: getStorage(app),
  uploadBytes,
};
