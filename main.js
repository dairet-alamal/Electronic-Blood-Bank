// دالة لفتح الأقسام
function openSection(section) {
  const content = document.getElementById("content");

  if (section === "add") {
    content.innerHTML = `
      <h2>➕ إضافة بيانات متبرع</h2>
      <form>
        <label>الاسم:</label><br>
        <input type="text" placeholder="أدخل الاسم"><br><br>

        <label>العمر:</label><br>
        <input type="number" placeholder="أدخل العمر"><br><br>

        <label>السكن:</label><br>
        <input type="text" placeholder="مكان السكن"><br><br>

        <label>رقم التلفون:</label><br>
        <input type="text" placeholder="أدخل رقم الهاتف"><br><br>

        <label>الأمراض المزمنة:</label><br>
        <input type="text" placeholder="أدخل الأمراض إن وجدت"><br><br>

        <label>الـ HP:</label><br>
        <input type="text" placeholder="أدخل فصيلة الدم"><br><br>

        <label>تاريخ آخر تبرع:</label><br>
        <input type="date"><br><br>

        <button type="submit">حفظ البيانات</button>
      </form>
    `;
  }

  else if (section === "search") {
    content.innerHTML = `
      <h2>🔍 البحث عن متبرع</h2>
      <p>هنا ستظهر نتائج البحث عن المتبرعين (هنربطها بقاعدة البيانات لاحقًا).</p>
    `;
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
