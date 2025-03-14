document.addEventListener("DOMContentLoaded", function () {
    // ดึงข้อมูลสินค้าจาก API
    fetch('http://localhost:3004/api/cart')  // URL ของ API
        .then(response => response.json())
        .then(data => {
            // ตรวจสอบว่ามีสินค้ามาไหม
            if (data && data.length > 0) {
                const cartItemsContainer = document.getElementById('cart-items-body');
                cartItemsContainer.innerHTML = ''; // ล้างข้อมูลเก่า

                let subTotal = 0; // กำหนดตัวแปรคำนวณยอดรวมสินค้า

                // แสดงสินค้าทั้งหมดในตะกร้า
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="product-info">
                            <img src="${item.image}" alt="${item.name}">
                            ${item.name}
                        </td>
                        <td>${item.quantity}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
                    `;
                    cartItemsContainer.appendChild(row);
                    subTotal += item.price * item.quantity; // คำนวณยอดรวมของสินค้าทั้งหมด
                });
            }
            // ดึงข้อมูลค่าส่งจาก localStorage
            const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));

            if (orderSummary) {
                // แสดงข้อมูลใน order summary
                document.getElementById('sub-total').innerText = `$${orderSummary.subTotal}`;
                document.getElementById('shipping-cost').innerText = `$${orderSummary.shippingCost}`;
                document.getElementById('total-price').innerText = `$${orderSummary.totalPrice}`;
                document.getElementById('total-items').innerText = orderSummary.totalItems;
            }
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });

    // เมื่อกดปุ่ม Place Order
    const placeOrderButton = document.querySelector('.place-order-btn');
    placeOrderButton.addEventListener('click', function () {
        // ลบข้อมูลทั้งหมดจากตะกร้า
        fetch('http://localhost:3004/api/cart', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you for your order! Your purchase has been confirmed.');
            window.location.href = '/home/home.html'; // ไปที่หน้า Home หรือหน้าอื่นๆ ที่ต้องการ
        })
        .catch(error => {
            console.error('Error clearing cart:', error);
            alert('There was an error clearing your cart.');
        });
    });
});
