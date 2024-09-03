// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIdN0z5xBIObREG1nPCsNAYfkMmglTG74",
  authDomain: "streetsmart-4f09e.firebaseapp.com",
  projectId: "streetsmart-4f09e",
  storageBucket: "streetsmart-4f09e.appspot.com",
  messagingSenderId: "948347218471",
  appId: "1:948347218471:web:de9b1a812c0f42e6ed3c02",
  measurementId: "G-L11VCV1CSW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6LfqGzUqAAAAAJH3n8rxjw6DxA3rBjTw8VuYfah2"),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});


export const auth = getAuth(app);
export const db = getFirestore(app);