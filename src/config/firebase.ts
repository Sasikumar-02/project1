// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDb_kvMbcmih4xNavixhC6ieu3Ou0btDg",
  authDomain: "project1-f982c.firebaseapp.com",
  projectId: "project1-f982c",
  storageBucket: "project1-f982c.appspot.com",
  messagingSenderId: "867297556266",
  appId: "1:867297556266:web:ba75509d3ded8b4df65053",
  measurementId: "G-EV3NG9ZJZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);  

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);