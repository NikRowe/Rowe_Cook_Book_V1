import firebase from "firebase/app"; //app is the barebones to get by instead of just firebase which will get everything //
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCsC2GK9kP7-2IHrSzYj1PCkJpuHiAZ4w4",
  authDomain: "rowe-cook-book-v1.firebaseapp.com",
  databaseURL: "https://rowe-cook-book-v1.firebaseio.com",
  projectId: "rowe-cook-book-v1",
  storageBucket: "rowe-cook-book-v1.appspot.com",
  messagingSenderId: "975473291090",
  appId: "1:975473291090:web:f608ed01427ee4386dd48b",
  measurementId: "G-V1MGPH6P9P",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//   firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider); // brigns up a popup for google signin //
export const signOut = () => auth.signOut(); // signs out of current user //
const settings = { timestampInSnapShots: true };
firestore.settings(settings);

window.firebase = firebase; // allows easy debugging //

export default firebaseConfig;
