import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyC3KQvUMrbMlvb1CBTt-y6ksYQBKr_P-ek",
    authDomain: "coursemanagement-79e69.firebaseapp.com",
    projectId: "coursemanagement-79e69",
    storageBucket: "coursemanagement-79e69.appspot.com",
    messagingSenderId: "112151587384",
    appId: "1:112151587384:web:ffbabb4f64fb6371f414cd",
    measurementId: "G-4KFH8ZJJTB"
  };

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(); 

export default firebaseConfig;
