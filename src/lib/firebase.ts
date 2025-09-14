// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGoCEXe78uhcLTo-mIUv_8G3pp27qkT2M",
  authDomain: "studio-5637634634-d071b.firebaseapp.com",
  projectId: "studio-5637634634-d071b",
  storageBucket: "studio-5637634634-d071b.appspot.com",
  messagingSenderId: "92462534820",
  appId: "1:92462534820:web:dcda35528847726e7cd631"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
