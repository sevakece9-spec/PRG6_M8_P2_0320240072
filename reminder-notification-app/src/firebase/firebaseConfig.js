// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDf16bIg64vl_1ytvrfqiC1_ssOpIccRWs",
  authDomain: "remindernotificationapp-c5b36.firebaseapp.com",
  projectId: "remindernotificationapp-c5b36",
  storageBucket: "remindernotificationapp-c5b36.firebasestorage.app",
  messagingSenderId: "220426680610",
  appId: "1:220426680610:web:751e7f5d7fba5a04628d7b",
  measurementId: "G-WHKLZ96BFS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;