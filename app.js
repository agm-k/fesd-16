import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZGXirF5AFL2n00yzU9ppewnMe3fO3gNw",
  authDomain: "fesd-16.firebaseapp.com",
  projectId: "fesd-16",
  storageBucket: "fesd-16.firebasestorage.app",
  messagingSenderId: "620825361278",
  appId: "1:620825361278:web:78ae451243c6c1b5c1d12f",
  measurementId: "G-EFBLRK9TBD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.sendComment = async function () {
  const text = document.getElementById("commentText").value.trim();
  if (text === "") return;

  await addDoc(collection(db, "comentarios"), {
    texto: text,
    fecha: new Date()
  });

  document.getElementById("commentText").value = "";
  loadComments();
};

async function loadComments() {
  const q = query(
    collection(db, "comentarios"),
    orderBy("fecha", "desc")
  );

  const querySnapshot = await getDocs(q);
  const list = document.getElementById("commentsList");
  list.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = document.createElement("p");
    p.textContent = doc.data().texto;
    list.appendChild(p);
  });
}

loadComments();

