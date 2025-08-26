// ----------------------------
// ربط مع Firebase
// ----------------------------
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.firebasestorage.app",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S",
  databaseURL: "https://amal-recovery-default-rtdb.firebaseio.com/" // مهم عشان التخزين
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ----------------------------
// إضافة متبرع جديد
// ----------------------------
const donorForm = document.getElementById("donorForm");

if (donorForm) {
  donorForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const donorData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      diseases: document.getElementById("diseases").value,
      hp: document.getElementById("hp").value,
      lastDonation: document.getElementById("lastDonation").value || "لم يتم التحديد"
    };

    try {
      const donorRef = push(ref(db, "donors"));
      await set(donorRef, donorData);
      alert("✅ تم حفظ بيانات المتبرع بنجاح!");
      donorForm.reset();
    } catch (error) {
      console.error("❌ خطأ أثناء الحفظ:", error);
    }
  });
}

// ----------------------------
// البحث عن متبرع
// ----------------------------
const searchForm = document.getElementById("searchForm");
const searchResults = document.getElementById("searchResults");

if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchName = document.getElementById("searchName").value.toLowerCase();
    const searchHP = document.getElementById("searchHP").value.toLowerCase();
    const searchAddress = document.getElementById("searchAddress").value.toLowerCase();

    try {
      const snapshot = await get(child(ref(db), "donors"));
      searchResults.innerHTML = "";

      if (snapshot.exists()) {
        const donors = snapshot.val();
        let found = false;

        Object.values(donors).forEach((donor) => {
          if (
            (searchName && donor.name.toLowerCase().includes(searchName)) ||
            (searchHP && donor.hp.toLowerCase().includes(searchHP)) ||
            (searchAddress && donor.address.toLowerCase().includes(searchAddress))
          ) {
            found = true;
            const div = document.createElement("div");
            div.className = "donor-card";
            div.innerHTML = `
              <h3>💉 ${donor.name}</h3>
              <p>العمر: ${donor.age}</p>
              <p>العنوان: ${donor.address}</p>
              <p>📞 ${donor.phone}</p>
              <p>الأمراض المزمنة: ${donor.diseases || "لا يوجد"}</p>
              <p>فصيلة الدم: ${donor.hp}</p>
              <p>آخر تبرع: ${donor.lastDonation}</p>
            `;
            searchResults.appendChild(div);
          }
        });

        if (!found) {
          searchResults.innerHTML = "<p>❌ لا توجد نتائج مطابقة</p>";
        }
      } else {
        searchResults.innerHTML = "<p>❌ لا توجد بيانات متبرعين</p>";
      }
    } catch (error) {
      console.error("❌ خطأ أثناء البحث:", error);
    }
  });
}
