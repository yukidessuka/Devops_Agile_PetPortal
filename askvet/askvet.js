document.addEventListener("DOMContentLoaded", function () {
    // ทำให้ปุ่มทั้งหมดคลิกได้
    document.querySelectorAll("button, a, input[type='submit'], select").forEach(element => {
        element.addEventListener("click", function (event) {
            alert(`คุณคลิกที่: ${element.innerText || element.value }!`);
        });
    });

    // ตรวจจับการป้อนข้อมูลในฟิลด์ข้อความ
    document.querySelectorAll("input[type='text'], textarea").forEach(element => {
        element.addEventListener("input", function () {
            console.log(`คุณกำลังพิมพ์: ${element.value}`);
        });
    });

    // ค้นหาเมื่อผู้ใช้พิมพ์ในช่องค้นหา
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                alert(`คุณกำลังค้นหา: ${searchInput.value}`);
            }
        });
    }
});
