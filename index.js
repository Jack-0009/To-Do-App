document.addEventListener("DOMContentLoaded", function () {

    // تعطيل زر الإضافة عند تحميل الصفحة
    document.querySelector("#submit").disabled = true;

    // تفعيل/تعطيل زر الإضافة بناءً على طول النص المدخل
    document.querySelector("#task").onkeyup = function () {
        if (document.querySelector("#task").value.length >= 3) {
            document.querySelector("#submit").disabled = false;
        } else {
            document.querySelector("#submit").disabled = true;
        }
    };

    // عند إرسال النموذج
    document.querySelector("form").onsubmit = function () {

        // قراءة النص من الحقل
        let task = document.querySelector("#task").value;

        // تحديد قائمة المهام المنجزة
        let oklist = document.querySelector("#oklist");
        oklist.classList.add("oklist");

        // إنشاء عنصر <li> جديد
        let li = document.createElement("li");
        li.classList.add("list"); // كلاس خاص بالمهام التي لم تنجز بعد

        // إنشاء زر الحذف مع أيقونته
        let delbut = document.createElement("button");
        delbut.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delbut.style.marginLeft = "10px";
        delbut.classList.add("delete-btn");
        delbut.onclick = function () {
            li.remove(); // حذف المهمة
        };

        // إنشاء زر التحقق مع أيقونته
        let chbut = document.createElement("button");
        chbut.innerHTML = '<i class="fa-solid fa-check"></i>';
        chbut.style.marginLeft = "10px";
        chbut.classList.add("done-btn");
        chbut.onclick = function () {
            chbut.remove(); // إزالة زر "تم" بعد النقل
            oklist.appendChild(li); // نقل المهمة إلى قائمة المنجز
            li.classList.remove("list"); // إزالة كلاس المهام العادية
            li.classList.add("oklists"); // إضافة كلاس المهام المنجزة
        };

        // إنشاء العنصر النصي
        let spanText = document.createElement("span");
        spanText.textContent = task; // إضافة نص المهمة

        // ترتيب العناصر داخل <li>
        li.appendChild(spanText);
        li.appendChild(delbut);
        li.appendChild(chbut);

        // إضافة <li> إلى قائمة المهام الجارية
        document.querySelector("#list").appendChild(li);

        // إعادة ضبط الحقل وزر الإضافة
        document.querySelector("#task").value = "";
        document.querySelector("#submit").disabled = true;

        return false; // منع إعادة تحميل الصفحة
    };

});
