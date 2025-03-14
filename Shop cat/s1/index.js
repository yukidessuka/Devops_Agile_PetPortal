document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.dataset.productId;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;
            const quantity = 1; // จำนวนเริ่มต้นเป็น 1

            // ส่งข้อมูลไปยัง Backend (API) ใช้ localhost:3004
            addToCart(productId, name, price, quantity, image);
        });
    });
});

function addToCart(productId, name, price, quantity, image) {
    // ใช้ localhost:3004 สำหรับพอร์ตที่กำหนดใน server.js
    fetch('http://localhost:3004/api/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, name, price, quantity, image })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Product added to cart');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
