// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG,
  authDomain: "pf-cerminati-react.firebaseapp.com",
  projectId: "pf-cerminati-react",
  storageBucket: "pf-cerminati-react.appspot.com",
  messagingSenderId: "367709270713",
  appId: "1:367709270713:web:2eeb11415fa97afc156168",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

