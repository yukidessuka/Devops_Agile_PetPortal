document.addEventListener("DOMContentLoaded", function () {
    // ค้นหาปุ่มแก้ไขทั้งหมด
    document.querySelectorAll(".edit-icon").forEach(icon => {
        icon.addEventListener("click", function () {
            let card = this.closest(".card"); // ค้นหาการ์ดที่เกี่ยวข้อง
            let texts = card.querySelectorAll("p:not(.non-editable)"); // ข้อความที่แก้ไขได้

            if (this.classList.contains("editing")) {
                // ถ้าอยู่ในโหมดแก้ไข -> บันทึกข้อมูลและเปลี่ยนกลับเป็นข้อความปกติ
                texts.forEach(input => {
                    let newValue = input.querySelector("input")?.value;
                    if (newValue) {
                        input.innerHTML = newValue; // อัปเดตค่าลงใน `<p>`
                    }
                });
                this.classList.remove("editing");
                this.innerHTML = "✏️"; // เปลี่ยนปุ่มกลับไปเป็นไอคอนแก้ไข
            } else {
                // เปลี่ยนเป็นโหมดแก้ไข
                texts.forEach(text => {
                    let value = text.innerText;
                    text.innerHTML = `<input type="text" value="${value}" class="edit-input">`;
                });
                this.classList.add("editing");
                this.innerHTML = "✔️"; // เปลี่ยนปุ่มเป็นเครื่องหมายถูกสำหรับบันทึก
            }
        });
    });
});
