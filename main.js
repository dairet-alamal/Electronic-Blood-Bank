// استدعاء مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات Firebase الخاصة بمشروعك (نفس قاعدة البيانات amal-recovery)
const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.firebasestorage.app",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// التقاط بيانات النموذج (إضافة متبرع)
const donorForm = document.getElementById("donorForm");

donorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const diseases = document.getElementById("diseases").value || "لا يوجد";
  const hp = document.getElementById("hp").value;
  const lastDonation = document.getElementById("lastDonation").value || "لا يوجد";

  try {
    await addDoc(collection(db, "donors"), {
      name,
      age,
      address,
      phone,
      diseases,
      hp,
      lastDonation,
      createdAt: new Date()
    });

    alert("✅ تم حفظ بيانات المتبرع بنجاح!");
    donorForm.reset();
  } catch (error) {
    console.error("خطأ أثناء حفظ البيانات: ", error);
    alert("❌ حصل خطأ أثناء حفظ البيانات!");
  }
});
