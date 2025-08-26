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

const addDonorForm = document.getElementById('addDonorForm');
const searchDonorForm = document.getElementById('searchDonorForm');
const benefitsInfo = document.getElementById('benefitsInfo');
const requirementsInfo = document.getElementById('requirementsInfo');

const submitDonorBtn = document.getElementById('submitDonorBtn');
const submitSearchBtn = document.getElementById('submitSearchBtn');
const searchResults = document.getElementById('searchResults');

// إظهار/إخفاء الأقسام
addDonorBtn.addEventListener('click', () => {
    hideAllSections();
    addDonorForm.classList.remove('hidden');
});

searchDonorBtn.addEventListener('click', () => {
    hideAllSections();
    searchDonorForm.classList.remove('hidden');
});

benefitsBtn.addEventListener('click', () => {
    hideAllSections();
    benefitsInfo.classList.remove('hidden');
});

requirementsBtn.addEventListener('click', () => {
    hideAllSections();
    requirementsInfo.classList.remove('hidden');
});

function hideAllSections() {
    addDonorForm.classList.add('hidden');
    searchDonorForm.classList.add('hidden');
    benefitsInfo.classList.add('hidden');
    requirementsInfo.classList.add('hidden');
}

// إضافة متبرع
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
            addDonorForm.reset();
        })
        .catch((error) => {
            alert('حدث خطأ: ' + error.message);
        });
});

// البحث عن متبرع حسب الفصيلة
submitSearchBtn.addEventListener('click', () => {
    const bloodType = document.getElementById('searchBloodType').value.trim();
    if (!bloodType) {
        alert('يرجى إدخال فصيلة الدم');
        return;
    }

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
            if (!found) {
                searchResults.innerHTML = '<p>لا يوجد متبرعين بهذه الفصيلة</p>';
            }
        } else {
            searchResults.innerHTML = '<p>لا يوجد بيانات</p>';
        }
    });
});
