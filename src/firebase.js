import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBT3TFbJzQ2DkP6ISvqCkUZdQWbEnRvwPM",
  authDomain: "lucascalle-1046f.firebaseapp.com",
  projectId: "lucascalle-1046f",
  storageBucket: "lucascalle-1046f.firebasestorage.app",
  messagingSenderId: "970613561739",
  appId: "1:970613561739:web:5c51641e01373923d2378e",
  measurementId: "G-R54WR7PZD6"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
