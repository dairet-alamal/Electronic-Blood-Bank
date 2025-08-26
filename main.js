// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عرض الأقسام
window.showSection = function (id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

// إضافة متبرع
const donorForm = document.getElementById("donorForm");
const addBtn = document.getElementById("addBtn");

if (donorForm) {
  donorForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "donors"), {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        diseases: document.getElementById("diseases").value,
        lastDonation: document.getElementById("lastDonation").value,
        bloodType: document.getElementById("bloodType").value
      });
      addBtn.classList.add("success");
      addBtn.textContent = "تمت الإضافة ✅";
      donorForm.reset();
    } catch (err) {
      console.error("خطأ:", err);
    }
  });
}

// البحث
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    const bloodType = document.getElementById("searchBloodType").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    try {
      const q = query(collection(db, "donors"), where("bloodType", "==", bloodType));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        resultsDiv.innerHTML = "<p>لا توجد نتائج</p>";
      } else {
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          resultsDiv.innerHTML += `
            <div class="donor-card">
              <p><strong>الاسم:</strong> ${d.name}</p>
              <p><strong>العمر:</strong> ${d.age}</p>
              <p><strong>السكن:</strong> ${d.address}</p>
              <p><strong>الهاتف:</strong> ${d.phone}</p>
              <p><strong>الأمراض:</strong> ${d.diseases}</p>
              <p><strong>آخر تبرع:</strong> ${d.lastDonation}</p>
              <p><strong>الفصيلة:</strong> ${d.bloodType}</p>
            </div>
            <hr>
          `;
        });
      }
    } catch (err) {
      console.error("خطأ في البحث:", err);
    }
  });
}
