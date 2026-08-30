import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {




  apiKey: "AIzaSyCOaLP89I8TBfbdeght2yHo_YDu7jBn7kU",




  authDomain: "ai-interview-coach-9cc7f.firebaseapp.com",




  projectId: "ai-interview-coach-9cc7f",




  storageBucket: "ai-interview-coach-9cc7f.firebasestorage.app",




  messagingSenderId: "25719141233",




  appId: "1:25719141233:web:39e7694b1d59166905bcd0"




};  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();