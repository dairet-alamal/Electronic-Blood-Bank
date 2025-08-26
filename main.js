// Firebase Initialization
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

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
const database = getDatabase(app);

// عناصر الصفحة
const addDonorBtn = document.getElementById('addDonorBtn');
const searchDonorBtn = document.getElementById('searchDonorBtn');
const benefitsBtn = document.getElementById('benefitsBtn');
const requirementsBtn = document.getElementById('requirementsBtn');
const contentArea = document.getElementById('contentArea');

// دوال مساعدة لإظهار الأقسام
function showAddDonor() {
    contentArea.innerHTML = `
        <h3>إضافة متبرع جديد</h3>
        <input type="text" id="donorName" placeholder="الاسم" required>
        <input type="number" id="donorAge" placeholder="العمر" required>
        <input type="text" id="donorAddress" placeholder="السكن" required>
        <input type="text" id="donorPhone" placeholder="رقم التلفون" required>
        <input type="text" id="donorDiseases" placeholder="الأمراض المزمنة" required>
        <input type="date" id="donorLastDonation" placeholder="تاريخ آخر تبرع (اختياري)">
        <select id="donorBloodType" required>
            <option value="">اختر فصيلة الدم</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
        </select>
        <button id="submitDonorBtn" class="red-btn">إضافة البيانات</button>
    `;

    const submitDonorBtn = document.getElementById('submitDonorBtn');
    submitDonorBtn.addEventListener('click', () => {
        const donorData = {
            name: document.getElementById('donorName').value,
            age: document.getElementById('donorAge').value,
            address: document.getElementById('donorAddress').value,
            phone: document.getElementById('donorPhone').value,
            diseases: document.getElementById('donorDiseases').value,
            lastDonation: document.getElementById('donorLastDonation').value || '',
            bloodType: document.getElementById('donorBloodType').value
        };
        const newDonorRef = push(ref(database, 'donors'));
        set(newDonorRef, donorData)
            .then(() => {
                submitDonorBtn.classList.add('green');
                alert('تم إضافة المتبرع بنجاح!');
                contentArea.innerHTML = '';
            })
            .catch((error) => alert('حدث خطأ: ' + error.message));
    });
}

function showSearchDonor() {
    contentArea.innerHTML = `
        <h3>بحث عن متبرع</h3>
        <input type="text" id="searchBloodType" placeholder="أدخل فصيلة الدم">
        <button id="submitSearchBtn" class="red-btn">بحث</button>
        <div id="searchResults"></div>
    `;
    const submitSearchBtn = document.getElementById('submitSearchBtn');
    const searchResults = document.getElementById('searchResults');

    submitSearchBtn.addEventListener('click', () => {
        const bloodType = document.getElementById('searchBloodType').value.trim();
        if (!bloodType) { alert('يرجى إدخال فصيلة الدم'); return; }

        get(child(ref(database), 'donors')).then((snapshot) => {
            searchResults.innerHTML = '';
            if (snapshot.exists()) {
                const donors = snapshot.val();
                let found = false;
                for (let key in donors) {
                    if (donors[key].bloodType === bloodType) {
                        found = true;
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <p>الاسم: ${donors[key].name}</p>
                            <p>العمر: ${donors[key].age}</p>
                            <p>السكن: ${donors[key].address}</p>
                            <p>رقم التلفون: ${donors[key].phone}</p>
                            <p>الأمراض المزمنة: ${donors[key].diseases}</p>
                            <p>آخر تبرع: ${donors[key].lastDonation || 'لم يتم'} </p>
                            <p>فصيلة الدم: ${donors[key].bloodType}</p>
                            <hr>
                        `;
                        searchResults.appendChild(div);
                    }
                }
                if (!found) searchResults.innerHTML = '<p>لا يوجد متبرعين بهذه الفصيلة</p>';
            } else {
                searchResults.innerHTML = '<p>لا يوجد بيانات</p>';
            }
        });
    });
}

function showBenefits() {
    contentArea.innerHTML = `
        <h3>فوائد التبرع</h3>
        <ul>
            <li>يساعد على إنقاذ حياة الآخرين.</li>
            <li>يساهم في تجديد الدم وتنشيط الدورة الدموية.</li>
            <li>يحسن صحة القلب ويقلل من الحديد الزائد في الجسم.</li>
        </ul>
    `;
}

function showRequirements() {
    contentArea.innerHTML = `
        <h3>شروط التبرع</h3>
        <ul>
            <li>أن يكون المتبرع بصحة جيدة.</li>
            <li>يجب أن يكون عمره بين 18 و 65 سنة.</li>
            <li>وزنه أكثر من 50 كجم.</li>
            <li>عدم الإصابة بأمراض مزمنة تمنع التبرع.</li>
        </ul>
    `;
}

// ربط الأزرار
addDonorBtn.addEventListener('click', showAddDonor);
searchDonorBtn.addEventListener('click', showSearchDonor);
benefitsBtn.addEventListener('click', showBenefits);
requirementsBtn.addEventListener('click', showRequirements);
