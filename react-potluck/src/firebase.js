import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "potluck-be71a.firebaseapp.com",
    databaseURL: "https://potluck-be71a.firebaseio.com",
    projectId: "potluck-be71a",
    storageBucket: "potluck-be71a.appspot.com",
    messagingSenderId: "267508138623"
  };
  firebase.initializeApp(config);

 export default firebase; 