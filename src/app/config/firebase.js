import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDJC_2IYGjQhVnELLNVjUFBXL3P8QxPHH4",
    authDomain: "revents-99de8.firebaseapp.com",
    projectId: "revents-99de8",
    storageBucket: "revents-99de8.appspot.com",
    messagingSenderId: "166140587958",
    appId: "1:166140587958:web:3d15e19f13357bb2f01b17"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;