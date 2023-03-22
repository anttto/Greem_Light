import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const dbRef = ref(getDatabase());

export async function getData() {
  return get(child(dbRef, `admins`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const userId = snapshot.val();
      return userId;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}


export async function login(){
  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return user;
  })
  .catch((error) => {
    console.log(error);
  });
}

export async function logout(){
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback){
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
