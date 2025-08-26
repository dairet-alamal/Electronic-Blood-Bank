// ============================
// Firebase (CDN Modules)
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

/**
 * إعدادات مشروعك - استخدمت بياناتك المذكورة.
 * صححت storageBucket إلى appspot.com (الصيغة الصحيحة).
 * measurementId غير مطلوب هنا.
 */
const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb"
};

// تشغيل Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================
// منطق إظهار/إخفاء الأقسام
// ============================
const panels = document.querySelectorAll(".panel");
function showSection(id){
  panels.forEach(p => p.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}
window.showSection = showSection;

// أربط أزرار القائمة
document.querySelectorAll(".menu .tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> showSection(btn.dataset.target));
});

// (افتراضياً: ما بنعرض أي قسم لحد ما المستخدم يضغط زر)

// ============================
// إضافة متبرع → Firestore
// ============================
const donorForm = document.getElementById("donorForm");
const addMsg = document.getElementById("addMessage");
const saveBtn = document.getElementById("saveBtn");

if (donorForm) {
  donorForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    // اقرا القيم
    const donor = {
      name: donorForm.name.value.trim(),
      age: Number(donorForm.age.value),
      address: donorForm.address.value.trim(),
      phone: donorForm.phone.value.trim(),
      diseases: donorForm.diseases.value.trim() || "",
      hp: donorForm.hp.value.trim(),
      lastDonation: donorForm.lastDonation.value || null,
      createdAt: new Date().toISOString()
    };

    // فحوصات بسيطة
    if (!donor.name || !donor.age || !donor.address || !donor.phone || !donor.hp) {
      addMsg.textContent = "الرجاء إكمال البيانات المطلوبة.";
      return;
    }

    try {
      await addDoc(collection(db, "donors"), donor);
      // رسالة نجاح + تغيير لون زر الحفظ للأخضر لحظياً
      addMsg.textContent = "✅ تم حفظ بيانات المتبرع بنجاح";
      saveBtn.classList.add("success");
      setTimeout(()=> saveBtn.classList.remove("success"), 1500);
      donorForm.reset();
    } catch (err) {
      console.error(err);
      addMsg.textContent = "❌ حدث خطأ أثناء الحفظ";
    }
  });
}

// ============================
// البحث (بالفصيلة فقط) → Firestore
// ============================
const searchForm = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");

if (searchForm) {
  searchForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    resultsDiv.innerHTML = "";

    const hp = document.getElementById("searchHp").value.trim();
    if (!hp){
      resultsDiv.textContent = "اكتب فصيلة الدم أولاً (مثال: O+)";
      return;
    }

    try {
      // استعلام دقيق على الفصيلة
      const q = query(collection(db, "donors"), where("hp", "==", hp));
      const snap = await getDocs(q);

      if (snap.empty){
        resultsDiv.textContent = "❌ لا توجد نتائج مطابقة لهذه الفصيلة";
      } else {
        snap.forEach(doc=>{
          const d = doc.data();
          const card = document.createElement("div");
          card.className = "donor-card";
          card.innerHTML = `
            <p><strong>الاسم:</strong> ${d.name}</p>
            <p><strong>العمر:</strong> ${d.age}</p>
            <p><strong>السكن:</strong> ${d.address}</p>
            <p><strong>الهاتف:</strong> ${d.phone}</p>
            <p><strong>الفصيلة:</strong> ${d.hp}</p>
            <p class="muted"><strong>آخر تبرع:</strong> ${d.lastDonation || "غير محدد"}</p>
          `;
          resultsDiv.appendChild(card);
        });
      }

      // زر البحث يتحول أخضر لحظياً
      searchBtn.classList.add("success");
      setTimeout(()=> searchBtn.classList.remove("success"), 1500);

    } catch (err) {
      console.error(err);
      resultsDiv.textContent = "❌ حدث خطأ أثناء البحث";
    }
  });
}
