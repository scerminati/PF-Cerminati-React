// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCjurF7UKATpgEtJq3NloCaECJhG8P3Fjw",
//   authDomain: "pf-cerminati-react.firebaseapp.com",
//   projectId: "pf-cerminati-react",
//   storageBucket: "pf-cerminati-react.appspot.com",
//   messagingSenderId: "367709270713",
//   appId: "1:367709270713:web:2eeb11415fa97afc156168",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

///Prueba

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8lGbcqR5DNiE-fl0Cq2kJaNCmJB_0N7s",
  authDomain: "pruebadejuegos-d2e68.firebaseapp.com",
  projectId: "pruebadejuegos-d2e68",
  storageBucket: "pruebadejuegos-d2e68.appspot.com",
  messagingSenderId: "253047365556",
  appId: "1:253047365556:web:54c61458c7f891b9cfdce1",
  measurementId: "G-LDT13BJ6Q0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
