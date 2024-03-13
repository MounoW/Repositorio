// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAGCGPnFoB3PCC6eetdjiubhufFhCexi7M',
    authDomain: 'blip-connectbook.firebaseapp.com',
    projectId: 'blip-connectbook',
    storageBucket: 'blip-connectbook.appspot.com',
    messagingSenderId: '339857156599',
    appId: '1:339857156599:web:5297338543c0dcc90966f2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
