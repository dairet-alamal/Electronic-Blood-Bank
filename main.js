(function () {
  const panel = document.getElementById("panel");
  const tiles = document.querySelectorAll(".tile");

  const views = {
    add: `
      <h2 style="margin:0 0 8px;font-weight:800;font-size:18px">إضافة بيانات متبرع</h2>
      <p>سيشمل النموذج الحقول التالية:</p>
      <ul>
        <li>الاسم، العمر، السكن، رقم التلفون</li>
        <li>الأمراض المزمنة</li>
        <li>فصيلة الدم و Hb (الهيموغلوبين)</li>
        <li>تاريخ آخر تبرع (إن وجد)</li>
      </ul>
      <p style="color:#6b7280;font-size:12px;margin-top:6px">سنربط الحقول بقاعدة البيانات في خطوة لاحقة.</p>
    `,
    search: `
      <h2 style="margin:0 0 8px;font-weight:800;font-size:18px">البحث عن متبرع</h2>
      <p>سيتم هنا عرض جميع المتبرعين المخزّنين مع إمكانية البحث والفلترة.</p>
    `,
    benefits: `
      <h2 style="margin:0 0 8px;font-weight:800;font-size:18px">فوائد التبرع بالدم</h2>
      <ul>
        <li>إنقاذ حياة المرضى والمصابين.</li>
        <li>تنشيط الدورة الدموية وتحفيز نخاع العظم لإنتاج خلايا دم جديدة.</li>
        <li>قد يقلل لدى بعض الناس من مخاطر أمراض القلب عبر خفض مخزون الحديد.</li>
        <li>فحص صحي روتيني قبل التبرع (ضغط، نبض، Hb، وفحوصات فيروسية).</li>
        <li>تعزيز روح المسؤولية والعمل الإنساني.</li>
      </ul>
      <p style="color:#6b7280;font-size:12px;margin-top:6px">هذه معلومات عامة إرشادية وليست بديلاً عن استشارة الجهات الصحية.</p>
    `,
    rules: `
      <h2 style="margin:0 0 8px;font-weight:800;font-size:18px">شروط وأهلية التبرع</h2>
      <ul>
        <li>العمر غالبًا بين 18–60 سنة.</li>
        <li>الوزن لا يقل عن 50 كجم.</li>
        <li>سلامة عامة وعدم وجود أمراض معدية نشطة.</li>
        <li>ضغط الدم والنبض في النطاق الطبيعي يوم التبرع.</li>
        <li>مرور ~3 أشهر منذ آخر تبرع بالدم الكامل.</li>
      </ul>
      <p style="color:#6b7280;font-size:12px;margin-top:6px">قد تختلف التفاصيل حسب السياسات المحلية لمراكز الدم.</p>
    `
  };

  tiles.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-view");
      panel.innerHTML = views[key] || "خانة غير معروفة.";
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
