// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCeA1GnMQvVpkQm9NzI_dqrjROjVYASgN8",
    authDomain: "my-expo-app1-d5eac.firebaseapp.com",
    projectId: "my-expo-app1-d5eac",
    storageBucket: "my-expo-app1-d5eac.firebasestorage.app",
    messagingSenderId: "809433289147",
    appId: "1:809433289147:web:e133e9c90c6f5d69b7749e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),   
})

export { auth };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCeA1GnMQvVpkQm9NzI_dqrjROjVYASgN8",
//   authDomain: "my-expo-app1-d5eac.firebaseapp.com",
//   projectId: "my-expo-app1-d5eac",
//   storageBucket: "my-expo-app1-d5eac.firebasestorage.app",
//   messagingSenderId: "809433289147",
//   appId: "1:809433289147:web:e133e9c90c6f5d69b7749e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
