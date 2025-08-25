// استدعاء Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.firebasestorage.app",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------
// إضافة متبرع
// ---------------------------------
const donorForm = document.getElementById("donorForm");
donorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const donorData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    diseases: document.getElementById("diseases").value || "لا يوجد",
    hp: document.getElementById("hp").value,
    lastDonation: document.getElementById("lastDonation").value || "لا يوجد"
  };

  try {
    await addDoc(collection(db, "donors"), donorData);
    alert("✅ تم حفظ بيانات المتبرع بنجاح!");
    donorForm.reset();
  } catch (error) {
    console.error("خطأ:", error);
    alert("❌ حصل خطأ أثناء الحفظ.");
  }
});

// ---------------------------------
// البحث عن متبرع
// ---------------------------------
const searchForm = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchValue = document.getElementById("search").value.trim();
  resultsDiv.innerHTML = "<p>⏳ جاري البحث...</p>";

  try {
    const q = query(collection(db, "donors"));
    const querySnapshot = await getDocs(q);

    let results = [];
    querySnapshot.forEach((doc) => {
      const donor = doc.data();
      if (
        donor.name.includes(searchValue) ||
        donor.hp.includes(searchValue) ||
        donor.address.includes(searchValue)
      ) {
        results.push(donor);
      }
    });

    if (results.length > 0) {
      resultsDiv.innerHTML = results
        .map(
          (d) => `
          <div class="donor-card">
            <p><strong>الاسم:</strong> ${d.name}</p>
            <p><strong>العمر:</strong> ${d.age}</p>
            <p><strong>السكن:</strong> ${d.address}</p>
            <p><strong>التلفون:</strong> ${d.phone}</p>
            <p><strong>الأمراض:</strong> ${d.diseases}</p>
            <p><strong>فصيلة الدم:</strong> ${d.hp}</p>
            <p><strong>آخر تبرع:</strong> ${d.lastDonation}</p>
          </div>
        `
        )
        .join("");
    } else {
      resultsDiv.innerHTML = "<p>❌ لا توجد نتائج مطابقة.</p>";
    }
  } catch (error) {
    console.error("خطأ في البحث:", error);
    resultsDiv.innerHTML = "<p>❌ حصل خطأ أثناء البحث.</p>";
  }
});
