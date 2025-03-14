document.addEventListener("DOMContentLoaded", function () {
    // ดึงข้อมูลจาก LocalStorage
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));

    if (orderSummary) {
        // แสดงข้อมูลใน order summary
        document.getElementById('sub-total').innerText = `$${orderSummary.subTotal}`;
        document.getElementById('shipping-cost').innerText = `$${orderSummary.shippingCost}`;
        document.getElementById('total-price').innerText = `$${orderSummary.totalPrice}`;
        document.getElementById('total-items').innerText = orderSummary.totalItems;
    }
});
