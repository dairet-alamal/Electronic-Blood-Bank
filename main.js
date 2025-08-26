// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ✅ بيانات مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyA-xxx", // ← استبدلها من Firebase console
  authDomain: "amal-recovery.firebaseapp.com",
  databaseURL: "https://amal-recovery-default-rtdb.firebaseio.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// دالة لإظهار قسم معين
function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}
window.showSection = showSection;

// ✅ إضافة متبرع
document.getElementById("donorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const donorData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    diseases: document.getElementById("diseases").value,
    hp: document.getElementById("hp").value,
    lastDonation: document.getElementById("lastDonation").value || "غير محدد"
  };

  const donorsRef = ref(db, "donors");
  const newDonorRef = push(donorsRef);
  await set(newDonorRef, donorData);

  document.getElementById("donorMessage").innerText = "✅ تم حفظ بيانات المتبرع بنجاح!";
  document.getElementById("donorForm").reset();
});

// ✅ البحث عن متبرع
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("searchName").value.trim().toLowerCase();
  const hp = document.getElementById("searchHp").value.trim().toLowerCase();
  const address = document.getElementById("searchAddress").value.trim().toLowerCase();

  const donorsRef = ref(db, "donors");
  const snapshot = await get(donorsRef);

  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "";

  if (snapshot.exists()) {
    const donors = snapshot.val();
    let found = false;

    Object.values(donors).forEach(donor => {
      if (
        (!name || donor.name.toLowerCase().includes(name)) &&
        (!hp || donor.hp.toLowerCase().includes(hp)) &&
        (!address || donor.address.toLowerCase().includes(address))
      ) {
        found = true;
        const div = document.createElement("div");
        div.classList.add("donor-card");
        div.innerHTML = `
          <p><strong>الاسم:</strong> ${donor.name}</p>
          <p><strong>العمر:</strong> ${donor.age}</p>
          <p><strong>العنوان:</strong> ${donor.address}</p>
          <p><strong>الهاتف:</strong> ${donor.phone}</p>
          <p><strong>الأمراض:</strong> ${donor.diseases}</p>
          <p><strong>الفصيلة:</strong> ${donor.hp}</p>
          <p><strong>آخر تبرع:</strong> ${donor.lastDonation}</p>
        `;
        resultsDiv.appendChild(div);
      }
    });

    if (!found) {
      resultsDiv.innerHTML = "<p style='color:red;'>❌ لا توجد نتائج مطابقة</p>";
    }
  } else {
    resultsDiv.innerHTML = "<p style='color:red;'>❌ قاعدة البيانات فارغة</p>";
  }
});
