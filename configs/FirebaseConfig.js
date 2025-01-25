// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-34535.firebaseapp.com",
  projectId: "ai-short-video-34535",
  storageBucket: "ai-short-video-34535.firebasestorage.app",
  messagingSenderId: "1074038718019",
  appId: "1:1074038718019:web:ef3328eae9fb4604a19ef6",
  measurementId: "G-YG73BWEMT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
