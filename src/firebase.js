import "firebase/database";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA2xl5YG2M5PvCIxyO52TXTPO_DgO_Ny5U",
  authDomain: "wencyacxt1.firebaseapp.com",
  databaseURL: "https://wencyacxt1-default-rtdb.firebaseio.com",
  projectId: "wencyacxt1",
  storageBucket: "wencyacxt1.appspot.com",
  messagingSenderId: "574822614345",
  appId: "1:574822614345:web:165dd996f93fc4e9f58698",
  measurementId: "G-H3TM0ZH5D7"
};

const app = initializeApp(firebaseConfig);
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();