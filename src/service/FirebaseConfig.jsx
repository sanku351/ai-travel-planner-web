// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKZh1FpRWtyICreqsxKTh3ZgKP97whVFA",
  authDomain: "travel-fc4da.firebaseapp.com",
  projectId: "travel-fc4da",
  storageBucket: "travel-fc4da.firebasestorage.app",
  messagingSenderId: "459145893129",
  appId: "1:459145893129:web:801f27e5cb5088107f2fd8",
  measurementId: "G-4ZEXB9CMKS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
