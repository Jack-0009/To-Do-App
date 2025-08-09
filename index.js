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
            edit.remove(); // إزالة زر التعديل بعد النقل
            oklist.appendChild(li); // نقل المهمة إلى قائمة المنجز
            li.classList.remove("list"); // إزالة كلاس المهام العادية
            li.classList.add("oklists"); // إضافة كلاس المهام المنجزة
        };

        // إنشاء زر التعديل
        let edit = document.createElement("button");
        edit.innerHTML = '<i class="fas fa-edit"></i>';
        edit.style.marginLeft = "10px";
        edit.classList.add("edit-btn");
        edit.onclick = function() {
            const li = this.parentElement;               // العنصر li الذي يحتوي على الزر والنص
            const span = li.querySelector("span");       // العنصر span الذي يحمل نص المهمة

            // إذا الزر يحتوي على أيقونة القلم (تعديل)، يعني نريد الانتقال لوضع التعديل
            if (this.innerHTML.includes('fa-edit')) {
                // إنشاء حقل إدخال نصي
                const input = document.createElement("input");
                input.type = "text";
                input.value = span.textContent;
                input.classList.add("edit-input");
                input.style.flexGrow = "1";  // ليأخذ أكبر عرض ممكن داخل li

                // استبدال النص span بحقل الإدخال
                li.replaceChild(input, span);

                // تغيير أيقونة الزر إلى حفظ (أيقونة علامة صح مثلاً)
                this.innerHTML = '<i class="fas fa-check"></i>';

                // إعطاء التركيز لحقل الإدخال
                input.focus();

            } else {
                // في حالة الضغط على زر الحفظ (أي بعد تعديل النص)

                const input = li.querySelector("input.edit-input");
                const newText = input.value.trim();

                if (newText.length > 0) {
                    // إنشاء عنصر span جديد للنص المعدل
                    const newSpan = document.createElement("span");
                    newSpan.textContent = newText;

                    // استبدال حقل الإدخال بالنص الجديد
                    li.replaceChild(newSpan, input);

                    // تغيير أيقونة الزر مرة أخرى إلى القلم (تعديل)
                    this.innerHTML = '<i class="fas fa-edit"></i>';
                } else {
                    alert("النص لا يمكن أن يكون فارغاً");
                    input.focus();
                }
            }
        };


        // إنشاء العنصر النصي
        let spanText = document.createElement("span");
        spanText.textContent = task; // إضافة نص المهمة

        // ترتيب العناصر داخل <li>
        li.appendChild(spanText);
        li.appendChild(delbut);
        li.appendChild(edit);
        li.appendChild(chbut);

        // إضافة <li> إلى قائمة المهام الجارية
        document.querySelector("#list").appendChild(li);

        // إعادة ضبط الحقل وزر الإضافة
        document.querySelector("#task").value = "";
        document.querySelector("#submit").disabled = true;

        return false; // منع إعادة تحميل الصفحة
    };

});
