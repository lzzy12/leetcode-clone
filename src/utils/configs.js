// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-m0RufOcKu-HzfpvpQo0v30OCx8B4B4",
  authDomain: "lazycode-ed4cf.firebaseapp.com",
  projectId: "lazycode-ed4cf",
  storageBucket: "lazycode-ed4cf.appspot.com",
  messagingSenderId: "374068666990",
  appId: "1:374068666990:web:774c159579ee79f416fc7f",
  measurementId: "G-2DQQ13DGYR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleClientId = import.meta.env.VITE_GOOGLE_API_CLIENT_ID;
