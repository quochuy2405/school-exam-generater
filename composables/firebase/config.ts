import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: 'AIzaSyDWodgWq2bRpccNHiCCtB8gbkOYsEIAO9w',
    authDomain: 'school-exam-generate.firebaseapp.com',
    projectId: 'school-exam-generate',
    storageBucket: 'school-exam-generate.appspot.com',
    messagingSenderId: '712719913047',
    appId: '1:712719913047:web:1cad9385e5e9e631141312',
    measurementId: 'G-QW4NTSPLM3',
}

// Use these for db & auth
const app = initializeApp(firebaseConfig)

// Get the Firestore and Auth instances
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export { auth, db, storage }
export default app
