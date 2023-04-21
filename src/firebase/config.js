import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

 
const firebaseConfig = {
  apiKey: "AIzaSyAMlqBGoEsVPPGG5_t2MNWtNhIsaemDlnA",
  authDomain: "swiftcart-a6158.firebaseapp.com",
  projectId: "swiftcart-a6158",
  storageBucket: "swiftcart-a6158.appspot.com",
  messagingSenderId: "100985812641",
  appId: "1:100985812641:web:4b0829af8c3476622b22e0",
  measurementId: "G-B9TZKHWMT5"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)


