
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPecwuEP52GuSEJKs1b39Td8xNDJlqRTM",
  authDomain: "miniblog-46534.firebaseapp.com",
  projectId: "miniblog-46534",
  storageBucket: "miniblog-46534.firebasestorage.app",
  messagingSenderId: "587402037935",
  appId: "1:587402037935:web:6d97d7ea300df72145e25a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { db,auth };