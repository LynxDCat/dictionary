const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, collection, getDocs, query } = require("firebase/firestore");

// Configs
// NOTE: Lagay sa .env para tago and lagay sa .gitignore yung env
const firebaseConfig = {
    apiKey: "AIzaSyCbsZKuijiV-qhzTXsyhIrIlk-U8kZsNZw",
    authDomain: "dictionary-66c29.firebaseapp.com",
    projectId: "dictionary-66c29",
    storageBucket: "dictionary-66c29.appspot.com",
    messagingSenderId: "932750038471",
    appId: "1:932750038471:web:f6898b0d5d0cc54bb275e2",
    measurementId: "G-SW74XJZQZE"
  };

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
        return app;
    } catch (error) {
        console.log(error);
    }
};

// Checking ng user database
const checkDocument = async (email, password) => {
    try {
        const docRef = doc(firestoreDb, "user", email);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().password === password) {
            console.log("Access Granted");
            return true;
        } else {
            console.log("Access Denieed");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    checkDocument
};