import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBd0HM-56Wiij5jZ3pMGFPkrMIIEbnDCVE",
  authDomain: "dribble-b9ec8.firebaseapp.com",
  projectId: "dribble-b9ec8",
  storageBucket: "dribble-b9ec8.appspot.com",
  messagingSenderId: "802400890359",
  appId: "1:802400890359:web:8aa1969fd8a9eb554792f2",
  measurementId: "G-YGYHR4P3PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}