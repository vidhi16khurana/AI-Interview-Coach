import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoALP89I8TBfbdeght2yHo_YDu7jBn7kI",
  authDomain: "ai-interview-coach-9c7f.firebaseapp.com",
  projectId: "ai-interview-coach-9c7f",
  storageBucket: "ai-interview-coach-9c7f.firebasestorage.app",
  messagingSenderId: "25719141233",
  appId: "1:25719141233:web:39e769b1d59166905bcd0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();