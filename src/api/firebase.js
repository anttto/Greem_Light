import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin: isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// export async function addNewProduct(product, imageUrl) {
//   const id = uuid();
//   return set(ref(database, `products/${id}`), {
//     ...product,
//     id: id,
//     price: parseInt(product.price),
//     url: imageUrl,
//     options: product.options.split(","),
//     type: product.type,
//     title: product.title,
//     category: product.category,
//     description: product.description,
//   });
// }

// export async function getProducts() {
//   return get(ref(database, `products`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return Object.values(snapshot.val());
//       }
//       return [];
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

//좋아요 목록 읽기
export async function getLiked(userId) {
  return get(ref(database, `${userId}/liked`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

//좋아요 누르기
export async function addLikedProduct(userId, product) {
  return set(ref(database, `${userId}/liked/${product.id}`), product);
}

//좋아요 해제하기  (구현 필요)
export async function removeLikedProduct(userId, product) {
  return remove(ref(database, `carts/${userId}/${product.id}`));
}

//내그림 읽어오기
export async function getArtwork(userId) {
  return get(ref(database, `${userId}/products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

//그림 쓰기
export async function addNewArtwork(userId, product, imageUrl) {
  const id = uuid();
  return set(ref(database, `${userId}/products/${id}`), {
    ...product,
    id: id,
    title: product.title,
    url: imageUrl,
    description: product.description,
    type: product.type,
  });
}

//그림 수정
//
//그림 삭제
//

//전체 그림 목록 읽기
export async function getAllArtwork(userId) {
  return get(ref(database, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}
