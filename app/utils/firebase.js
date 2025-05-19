import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY-28zSi8Rggglir-ZVgJGrmroZ7Tj1TU",
  authDomain: "finance-tracker-23202.firebaseapp.com",
  projectId: "finance-tracker-23202",
  storageBucket: "finance-tracker-23202.appspot.com",
  messagingSenderId: "1066102343484",
  appId: "1:1066102343484:web:2b6b988c1f6f4b36428039",
  measurementId: "G-5QPHH15HRN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);