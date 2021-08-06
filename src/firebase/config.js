  
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2T3FH9UJGcDv5Uxl7xmiK6mUz2BVDqLk",
  authDomain: "bike-maintain.firebaseapp.com",
  projectId: "bike-maintain",
  storageBucket: "bike-maintain.appspot.com",
  messagingSenderId: "798176927210",
  appId: "1:798176927210:web:bfa9a4d32268ab1e67e693",
  measurementId: "G-LC399RQ80T"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
