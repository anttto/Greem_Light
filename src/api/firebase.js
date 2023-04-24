import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const provider = new GoogleAuthProvider();
const database = getDatabase(app);

//회원 가입
export async function join(email, password, displayName) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .then((user) => {
      updateUser(displayName);
      addUser(user, displayName); //가입 User DB 저장
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

//유저 정보 업데이트 (displayName)
export async function updateUser(displayName) {
  return updateProfile(auth.currentUser, {
    displayName: displayName,
  });
}

//로그인
export async function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.replace("/");
      return user;
    })
    .catch((error) => {
      alert("먼저 회원 가입을 진행해주세요.");
    });
}

//로그아웃
export async function logout() {
  return signOut(auth).then(() => null);
}

//유저 상태 체크
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
}

//가입 일자
const joinTime = () => {
  const today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
};

//신규 가입 User 추가 : DB Create
export async function addUser(user, displayName) {
  return set(ref(database, `Users/${user.uid}`), {
    email: user.email,
    joinDate: joinTime(),
    displayName: displayName,
    level: 1,
  });
}

export async function getUser(userId) {
  return get(ref(database, `Users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const result = Object.values(snapshot.val());
      return result;
    }
  });
}

//좋아요 한 제품 목록
export async function getLiked(userId) {
  return get(ref(database, `liked/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const likedProducts = Object.values(snapshot.val());
      return likedProducts;
    }
    return [];
  });
}

export async function removeLikedProduct(userId, product) {
  return remove(ref(database, `liked/${userId}/${product.productId}`));
}

//좋아요 추가 : DB Create
export async function addLikedProduct(userId, product) {
  return set(ref(database, `liked/${userId}/${product.productId}`), {
    productId: product.productId,
  });
}

//좋아요 카운트 제어
export async function updateLikeCount(likeCnt, product) {
  return set(ref(database, `products/${product.productId}`), {
    ...product,
    productId: product.productId,
    uid: product.uid,
    title: product.title,
    url: product.url,
    description: product.description,
    liked: likeCnt,
  }).then(() => console.log("like check"));
}

//내그림 읽어오기
export async function getMyArtwork(userId) {
  return get(ref(database, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const arr = Object.values(snapshot.val());
        const myArtworks = arr.filter((product) => product.uid === userId);
        return myArtworks.reverse();
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

//좋아요 클릭한 그림 읽어오기
export async function getMyLikedArtwork(likedProduct = {}) {
  const snapshot = await get(ref(database, `products`));
  if (snapshot.exists()) {
    const likedKey = Object.values(likedProduct);
    const productArr = Object.values(snapshot.val());
    const resultArr = findMatchingObjects(likedKey, productArr);
    return resultArr;
  } else {
    return [];
  }
}

//Liked 와 Products 의 배열 객체 비교 후 같은 것을 matchingObjects 배열에 담는 함수식
function findMatchingObjects(arr1, arr2) {
  const matchingObjects = [];
  arr1.forEach((obj1) => {
    arr2.forEach((obj2) => {
      // 객체의 속성들이 모두 같은지 비교
      const isSameObject = Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
      // 같은 객체일 경우 matchingObjects 배열에 추가
      if (isSameObject) {
        matchingObjects.push(obj2);
      }
    });
  });
  return matchingObjects;
}

//전체 그림 목록 읽기
export async function getAllArtwork() {
  return get(ref(database, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const arr = Object.values(snapshot.val());
        return shuffle(arr);
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}
//전체 그림 목록 - 랜덤 배열 셔플
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function selectArtwork(productId) {
  return get(ref(database, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const arr = Object.values(snapshot.val());
        const selectArtwork = arr.filter((product) => product.productId === productId);
        return selectArtwork[0];
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

//그림 업로드
export async function addNewArtwork(uid, product, imageUrl) {
  const productId = uuid();
  return set(ref(database, `products/${productId}`), {
    ...product,
    productId: productId,
    uid: uid,
    title: product.title,
    url: imageUrl,
    description: product.description,
    liked: 0,
  }).catch((error) => {
    console.error(error);
  });
}

export async function updateArtwork(editArtwork) {
  // console.log(editArtwork);
  // console.log(editArtwork.productId);
  return set(ref(database, `products/${editArtwork.productId}`), {
    ...editArtwork,
    productId: editArtwork.productId,
    uid: editArtwork.uid,
    title: editArtwork.title,
    url: editArtwork.url,
    description: editArtwork.description,
    liked: editArtwork.liked,
  }).catch((error) => {
    console.error(error);
  });
}

export async function removeProductDb(product) {
  return remove(ref(database, `products/${product.productId}`));
}
export async function removeLikedDb(userId, product) {
  return remove(ref(database, `liked/${userId}/${product.productId}`));
}

//---------------------구현 필요한 것들---------------------
//그림 수정
//
//그림 삭제
//
//좋아요 해제하기
// export async function removeLikedProduct(userId, product) {
//   return remove(ref(database, `carts/${userId}/${product.id}`));
// }
//---------------------구현 필요한 것들---------------------
//어드민 체크 로직
// async function adminUser(user) {
//   return get(ref(database, `admins`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const admins = snapshot.val();
//         const isAdmin = admins.includes(user.uid);
//         return { ...user, isAdmin: isAdmin };
//       } else {
//         return user;
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
