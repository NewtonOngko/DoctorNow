import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
var firebaseConfig = {
    apiKey: "AIzaSyCnAuErrsUVJ1CttIOijLaZuVfMlHgcuG0",
    authDomain: "doctor-now-cf866.firebaseapp.com",
    projectId: "doctor-now-cf866",
    storageBucket: "doctor-now-cf866.appspot.com",
    messagingSenderId: "206985607250",
    appId: "1:206985607250:web:95ab2c647f72376a8b478b",
    measurementId: "G-Q4FBZVZ4PG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
  firebase.analytics();

  export  {
    storage, firebase as default
  }