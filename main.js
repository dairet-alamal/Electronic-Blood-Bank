// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// إظهار/إخفاء الأقسام
function toggleSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
window.toggleSection = toggleSection;

// إضافة متبرع
document.getElementById("donorForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const donor = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    diseases: document.getElementById("diseases").value,
    hp: document.getElementById("hp").value,
    lastDonation: document.getElementById("lastDonation").value
  };
  await addDoc(collection(db, "donors"), donor);
  alert("تم حفظ بيانات المتبرع ✅");
  document.getElementById("saveBtn").classList.add("done");
  e.target.reset();
});

// البحث
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const bloodType = document.getElementById("searchHp").value;
  const q = query(collection(db, "donors"), where("hp", "==", bloodType));
  const results = await getDocs(q);
  const container = document.getElementById("searchResults");
  container.innerHTML = "";
  if (results.empty) {
    container.innerHTML = "<p>لا توجد نتائج.</p>";
  } else {
    results.forEach(doc => {
      const d = doc.data();
      container.innerHTML += `
        <div class="card">
          <p><b>الاسم:</b> ${d.name}</p>
          <p><b>العمر:</b> ${d.age}</p>
          <p><b>السكن:</b> ${d.address}</p>
          <p><b>الهاتف:</b> ${d.phone}</p>
          <p><b>فصيلة الدم:</b> ${d.hp}</p>
        </div>
      `;
    });
  }
  document.getElementById("searchBtn").classList.add("done");
});
