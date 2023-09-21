// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCKTjaGziKSJefREgi-VT4cTYIBi46CHCw",
  authDomain: "socialmedia-react-e5c5a.firebaseapp.com",
  projectId: "socialmedia-react-e5c5a",
  storageBucket: "socialmedia-react-e5c5a.appspot.com",
  messagingSenderId: "401744242932",
  appId: "1:401744242932:web:cbb0b89a187a75b44256a1",
  measurementId: "G-9YZMR53R9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
