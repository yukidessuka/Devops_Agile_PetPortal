document.addEventListener("DOMContentLoaded", function () {
    fetchCartItems(); // เรียกใช้งานการดึงข้อมูลสินค้าจาก API

    // ฟังก์ชันสำหรับดึงข้อมูลสินค้าจาก API
    function fetchCartItems() {
        console.log('Fetching cart items...');
        fetch('http://localhost:3004/api/cart') // URL ของ API
            .then(response => response.json())
            .then(data => {
                console.log('Cart Items:', data);
                displayCartItems(data); // ส่งข้อมูลที่ดึงมาแสดง
                calculateTotal(); // คำนวณยอดรวม
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    // ฟังก์ชันสำหรับแสดงสินค้าในตะกร้า
    function displayCartItems(items) {
        const cartItemsContainer = document.getElementById('cart-items-body');
        cartItemsContainer.innerHTML = ''; // ล้างข้อมูลเก่า

        let total = 0;
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="product-info">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.name}
                </td>
                <td>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity('${item.productId}', -1)">−</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button class="qty-btn" onclick="updateQuantity('${item.productId}', 1)">+</button>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });
    }

    // ฟังก์ชันคำนวณยอดรวม
    function calculateTotal() {
        const shippingCost = calculateShippingCost();
        let subTotal = 0;

        // คำนวณ sub-total ของสินค้าทั้งหมด
        const cartItems = document.querySelectorAll('.subtotal');
        cartItems.forEach(item => {
            subTotal += parseFloat(item.innerText.replace('$', ''));
        });

        // คำนวณ total โดยรวมค่าจัดส่ง
        const totalPrice = subTotal + shippingCost;

        // อัปเดตยอดรวมที่หน้าเว็บ
        document.getElementById('sub-total').innerText = `$${subTotal.toFixed(2)}`;
        document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
        document.getElementById('shipping-cost').innerText = `$${shippingCost.toFixed(2)}`;
        document.getElementById('total-items').innerText = cartItems.length; // จำนวนสินค้าทั้งหมด

        // เก็บข้อมูลใน LocalStorage
        localStorage.setItem('orderSummary', JSON.stringify({
            subTotal: subTotal.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            totalPrice: totalPrice.toFixed(2),
            totalItems: cartItems.length
        }));
    }

    // ฟังก์ชันคำนวณค่าจัดส่ง
    function calculateShippingCost() {
        const shippingMethods = document.querySelectorAll('input[name="shipping-method"]:checked');
        let shippingCost = 0;

        // ตรวจสอบว่ามีการเลือกวิธีการจัดส่งหรือไม่
        if (shippingMethods.length > 0) {
            if (shippingMethods[0].value === 'free') {
                shippingCost = 0; // ค่าจัดส่งฟรี
            } else if (shippingMethods[0].value === '15') {
                shippingCost = 15; // ค่าจัดส่ง SPX
            }
        }
        return shippingCost;
    }

    // ฟังก์ชันอัพเดตจำนวนสินค้า
    window.updateQuantity = function (productId, change) {
        fetch('http://localhost:3004/api/cart/' + productId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ change })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchCartItems(); // รีเฟรชข้อมูลหลังจากอัพเดต
        })
        .catch(error => console.error('Error updating quantity:', error));
    };

    // ฟังก์ชันคำนวณค่าจัดส่งเมื่อมีการเลือก
    document.querySelectorAll('input[name="shipping-method"]').forEach(input => {
        input.addEventListener('change', function() {
            calculateTotal(); // รีคำนวณราคาเมื่อเลือกวิธีการจัดส่ง
        });
    });
});
