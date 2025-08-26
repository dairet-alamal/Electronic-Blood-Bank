// ========================
// 1. ربط Firebase
// ========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// بيانات مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========================
// 2. التحكم في عرض الأقسام
// ========================
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
window.showSection = showSection;

// ========================
// 3. إضافة متبرع
// ========================
const donorForm = document.getElementById("donorForm");
if (donorForm) {
  donorForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "donors"), {
        name: donorForm.name.value,
        age: donorForm.age.value,
        address: donorForm.address.value,
        phone: donorForm.phone.value,
        diseases: donorForm.diseases.value,
        hp: donorForm.hp.value,
        lastDonation: donorForm.lastDonation.value || null,
        createdAt: new Date().toISOString()
      });

      document.getElementById("addMessage").textContent = "✅ تم حفظ بيانات المتبرع بنجاح";
      donorForm.reset();
    } catch (error) {
      console.error("خطأ في إضافة المتبرع:", error);
    }
  });
}

// ========================
// 4. البحث عن متبرع
// ========================
const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("searchName").value.trim();
    const hp = document.getElementById("searchHp").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "⏳ جاري البحث...";

    let q = collection(db, "donors");
    let conditions = [];

    if (name) conditions.push(where("name", "==", name));
    if (hp) conditions.push(where("hp", "==", hp));

    let finalQuery = query(q, ...conditions);

    try {
      const snapshot = await getDocs(finalQuery);
      resultsDiv.innerHTML = "";

      if (snapshot.empty) {
        resultsDiv.textContent = "❌ لا توجد نتائج";
        return;
      }

      snapshot.forEach(doc => {
        const d = doc.data();
        const card = document.createElement("div");
        card.className = "donor-card";
        card.innerHTML = `
          <h3>${d.name}</h3>
          <p>العمر: ${d.age}</p>
          <p>العنوان: ${d.address}</p>
          <p>الهاتف: ${d.phone}</p>
          <p>الفصيلة: ${d.hp}</p>
          <p>آخر تبرع: ${d.lastDonation || "لا يوجد"}</p>
        `;
        resultsDiv.appendChild(card);
      });
    } catch (error) {
      console.error("خطأ في البحث:", error);
    }
  });
}
