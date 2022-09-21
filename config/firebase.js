import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4N36eVtRr19Q8eO0GDa7TjVYy3GPaTcw",
  authDomain: "furnscape-c8ffb.firebaseapp.com",
  projectId: "furnscape-c8ffb",
  storageBucket: "furnscape-c8ffb.appspot.com",
  messagingSenderId: "974947258538",
  appId: "1:974947258538:web:4b262fa241f2dcfe7f80d3",
  measurementId: "G-LXDK94SDME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
