document.addEventListener("DOMContentLoaded", function () {
    // ค้นหาปุ่มทั้งหมดที่มีข้อความ 'Add to Cart'
    const addToCartButtons = document.querySelectorAll("span[class^='add-to-cart']");
  
    addToCartButtons.forEach(button => {
      button.style.cursor = "pointer"; // เปลี่ยนให้เป็น pointer เมื่อ hover
      button.addEventListener("click", function () {
        alert("สินค้าได้ถูกเพิ่มไปยังตะกร้า!");
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
  
    // เพิ่ม effect เมื่อเลื่อนหน้าเว็บ
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.style.background = "#f8f8f8"; // เปลี่ยนสีพื้นหลัง Navbar
      } else {
      }
    });
  
    // ทำให้เมนูคลิกได้
    menuItems.forEach(item => {
      item.style.cursor = "pointer";
      item.addEventListener("click", function () {
        alert("คุณคลิกที่เมนู: " + item.innerText);
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const nextButtons = document.querySelectorAll(".next-ltr, .next-ltr-a");
    
    nextButtons.forEach(button => {
        button.style.cursor = "pointer";  // Show pointer cursor on hover
        button.addEventListener("click", function () {
            window.location.href = "../nextpage.html";  // ใช้ย้อนกลับไปโฟลเดอร์หลักถ้าจำเป็น

        });
    });
});



  
  