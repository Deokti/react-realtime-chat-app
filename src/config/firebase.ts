import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBj_tJCLWSaEv3ee583VyWWIHxRPxHoQ_0",
  authDomain: "react-realtime-chat-app.firebaseapp.com",
  databaseURL: "https://react-realtime-chat-app.firebaseio.com",
  projectId: "react-realtime-chat-app",
  storageBucket: "react-realtime-chat-app.appspot.com",
  messagingSenderId: "181555051722",
  appId: "1:181555051722:web:2202d3e9e484ddc88b8833"
};

const initializeFirebase = firebase.initializeApp(firebaseConfig);
const auth = initializeFirebase.auth();
const database = initializeFirebase.database();
const storage = initializeFirebase.storage();

export default initializeFirebase;
export { auth, database, storage };
