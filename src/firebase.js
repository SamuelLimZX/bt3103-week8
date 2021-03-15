import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTZz1OaBVNgudUvH3LjmQUF16H9aQgLTg",
    authDomain: "bt3103-week-6-709c8.firebaseapp.com",
    projectId: "bt3103-week-6-709c8",
    storageBucket: "bt3103-week-6-709c8.appspot.com",
    messagingSenderId: "211632015449",
    appId: "1:211632015449:web:49eb763d137ffa4d990948",
    measurementId: "G-JY07V5599R"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;