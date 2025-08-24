// --- ربط Firebase ---
// (استعمل نفس بيانات التهيئة بتاعة مشروعك "amal-recovery")

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "amal-recovery.firebaseapp.com",
  databaseURL: "https://amal-recovery-default-rtdb.firebaseio.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- دوال المنصة ---

function openSection(section) {
  const content = document.getElementById("content");

  if (section === "add") {
    content.innerHTML = `
      <h2>➕ إضافة بيانات متبرع</h2>
      <form id="donorForm">
        <label>الاسم:</label><br>
        <input type="text" id="name"><br><br>

        <label>العمر:</label><br>
        <input type="number" id="age"><br><br>

        <label>السكن:</label><br>
        <input type="text" id="address"><br><br>

        <label>رقم التلفون:</label><br>
        <input type="text" id="phone"><br><br>

        <label>الأمراض المزمنة:</label><br>
        <input type="text" id="diseases"><br><br>

        <label>الـ HP (فصيلة الدم):</label><br>
        <input type="text" id="hp"><br><br>

        <label>تاريخ آخر تبرع:</label><br>
        <input type="date" id="lastDonation"><br><br>

        <button type="submit">حفظ البيانات</button>
      </form>
    `;

    // ربط الفورم مع قاعدة البيانات
    document.getElementById("donorForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const donorData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        diseases: document.getElementById("diseases").value,
        hp: document.getElementById("hp").value,
        lastDonation: document.getElementById("lastDonation").value,
        createdAt: new Date().toISOString()
      };

      // تخزين البيانات في فرع donors/
      database.ref("donors/").push(donorData)
        .then(() => {
          alert("✅ تم حفظ بيانات المتبرع بنجاح");
          document.getElementById("donorForm").reset();
        })
        .catch((error) => {
          alert("❌ خطأ: " + error.message);
        });
    });
  }

  else if (section === "search") {
    content.innerHTML = `
      <h2>🔍 البحث عن متبرع</h2>
      <div id="donorsList">جاري تحميل البيانات...</div>
    `;

    // قراءة البيانات من قاعدة البيانات
    const donorsList = document.getElementById("donorsList");
    database.ref("donors/").once("value", (snapshot) => {
      donorsList.innerHTML = "";
      snapshot.forEach((child) => {
        const donor = child.val();
        donorsList.innerHTML += `
          <div style="border:1px solid #e60000; padding:10px; margin:10px; border-radius:8px; text-align:right; direction:rtl;">
            <b>الاسم:</b> ${donor.name} <br>
            <b>العمر:</b> ${donor.age} <br>
            <b>السكن:</b> ${donor.address} <br>
            <b>الهاتف:</b> ${donor.phone} <br>
            <b>الأمراض:</b> ${donor.diseases} <br>
            <b>فصيلة الدم:</b> ${donor.hp} <br>
            <b>آخر تبرع:</b> ${donor.lastDonation || "—"} <br>
          </div>
        `;
      });
      if (!snapshot.exists()) {
        donorsList.innerHTML = "⚠️ لا توجد بيانات متبرعين حتى الآن.";
      }
    });
  }

  else if (section === "benefits") {
    content.innerHTML = `
      <h2>❤️ فوائد التبرع</h2>
      <ul>
        <li>تنشيط الدورة الدموية.</li>
        <li>المساعدة في تقليل مخزون الحديد الزائد.</li>
        <li>المساهمة في إنقاذ حياة الآخرين.</li>
        <li>فحص طبي مجاني قبل كل تبرع.</li>
      </ul>
    `;
  }

  else if (section === "conditions") {
    content.innerHTML = `
      <h2>📋 شروط التبرع</h2>
      <ul>
        <li>أن يكون العمر بين 18 و 65 سنة.</li>
        <li>أن يكون الوزن 50 كجم أو أكثر.</li>
        <li>أن يكون المتبرع سليم من الأمراض المعدية.</li>
        <li>أن لا يكون قد تبرع خلال أقل من 3 أشهر.</li>
      </ul>
    `;
  }
}
