// استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// إعدادات مشروعك في Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  databaseURL: "https://amal-recovery-default-rtdb.firebaseio.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 📌 حفظ بيانات المتبرع في قاعدة البيانات
document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // نجمع البيانات من الفورم
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const chronic = document.getElementById("chronic").value;
  const hp = document.getElementById("hp").value;
  const lastDonation = document.getElementById("lastDonation").value;

  // مرجع لفرع donors في قاعدة البيانات
  const donorRef = ref(db, 'donors');
  const newDonor = push(donorRef);

  set(newDonor, {
    name: name,
    age: age,
    address: address,
    phone: phone,
    chronic: chronic,
    hp: hp,
    lastDonation: lastDonation,
    createdAt: new Date().toISOString()
  }).then(() => {
    alert("تم حفظ بيانات المتبرع بنجاح ✅");
    document.getElementById("donorForm").reset();
  }).catch((error) => {
    alert("حصل خطأ: " + error.message);
  });
});

// 📌 استرجاع بيانات المتبرعين وعرضها
function loadDonors() {
  const donorRef = ref(db, 'donors');
  onValue(donorRef, (snapshot) => {
    const donorsList = document.getElementById("donorsList");
    donorsList.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const donor = childSnapshot.val();
      const div = document.createElement("div");
      div.classList.add("donor-card");
      div.innerHTML = `
        <h3>${donor.name} (${donor.age} سنة)</h3>
        <p><b>السكن:</b> ${donor.address}</p>
        <p><b>الهاتف:</b> ${donor.phone}</p>
        <p><b>الأمراض المزمنة:</b> ${donor.chronic}</p>
        <p><b>HP:</b> ${donor.hp}</p>
        <p><b>آخر تبرع:</b> ${donor.lastDonation || "لا يوجد"}</p>
        <hr>
      `;
      donorsList.appendChild(div);
    });
  });
}

// نشغل التحميل أول ما يفتح
if (document.getElementById("donorsList")) {
  loadDonors();
}
