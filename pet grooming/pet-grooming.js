document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", function () {
            // ปิด FAQ อื่น ๆ ก่อน
            faqItems.forEach((el) => {
                if (el !== item) {
                    el.classList.remove("active");
                    el.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            // เปิด-ปิด FAQ ที่คลิก
            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px"; // เพิ่ม maxHeight ตามขนาดของเนื้อหา
            } else {
                answer.style.maxHeight = null; // ปิดคำตอบ
            }
        });
    });
});

