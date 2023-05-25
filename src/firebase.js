import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjNZ21PWK4Mq7TSJY7RQzQLOjMtJGzK34",
  authDomain: "bug-tr.firebaseapp.com",
  projectId: "bug-tr",
  storageBucket: "bug-tr.appspot.com",
  messagingSenderId: "126507318860",
  appId: "1:126507318860:web:af2f13be3c46f3bcc83ee9",
  measurementId: "G-2F4XH0BSYZ"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
