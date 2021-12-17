import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKovJ4sRq1Ljo0W7n9d8WjE08Vh0Z8Y50",
    authDomain: "netflix-clone-585e7.firebaseapp.com",
    projectId: "netflix-clone-585e7",
    storageBucket: "netflix-clone-585e7.appspot.com",
    messagingSenderId: "951382247045",
    appId: "1:951382247045:web:aaa47580a866a933cfcbec"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth }
  export default db;