// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJJte-nczXwya3eACaK8R7mzAp_tf17yo",
  authDomain: "screentimecontrolreminder.firebaseapp.com",
  projectId: "screentimecontrolreminder",
  storageBucket: "screentimecontrolreminder.firebasestorage.app",
  messagingSenderId: "413069768917",
  appId: "1:413069768917:web:274ee36125e959742f0a5c",
  measurementId: "G-5J280BHGQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);