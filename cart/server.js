const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3004;  // เปลี่ยนพอร์ตเป็น 3004

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // เปิดใช้งาน CORS

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petcare', {
    authSource: 'admin'
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// สร้าง Schema และ Model สำหรับตะกร้า
const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: {
        type: String, // URL ของรูปภาพสินค้า
        required: true
    }
});

// กำหนดชื่อ collection เป็น 'cart' (c ตัวพิมพ์เล็ก)
const Cart = mongoose.model('Cart', cartSchema, 'cart');

// API สำหรับเพิ่มสินค้าลงในตะกร้า
app.post('/api/add-to-cart', async (req, res) => {
    const { productId, name, price, quantity, image } = req.body;

    try {
        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            // ถ้ามีสินค้าในตะกร้าแล้ว เพิ่มจำนวนสินค้า
            cartItem.quantity += quantity;
        } else {
            // ถ้าไม่มีสินค้าในตะกร้า, เพิ่มสินค้าลง
            cartItem = new Cart({ productId, name, price, quantity, image });
        }

        // บันทึกข้อมูลลงในฐานข้อมูล
        await cartItem.save();
        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});

// API สำหรับอัพเดตจำนวนสินค้า
app.put('/api/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { change } = req.body; // รับค่าการเปลี่ยนแปลงจำนวนสินค้า

    try {
        let cartItem = await Cart.findOne({ productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // ปรับจำนวนสินค้า
        cartItem.quantity += change;

        if (cartItem.quantity <= 0) {
            // หากจำนวนสินค้า <= 0 ลบออกจากตะกร้า
            await Cart.deleteOne({ productId });
            return res.status(200).json({ message: 'Product removed from cart' });
        }

        await cartItem.save(); // บันทึกการอัพเดตจำนวนสินค้า
        res.status(200).json({ message: 'Product quantity updated', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product quantity', error });
    }
});

// API สำหรับดึงข้อมูลสินค้าจากตะกร้า
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();  // ดึงข้อมูลทั้งหมดจากตะกร้า
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error });
    }
});

// API สำหรับการลบสินค้าจากตะกร้า
app.delete('/api/cart/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        await Cart.deleteOne({ productId });
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product from cart', error });
    }
});

// API สำหรับการล้างตะกร้า
app.delete('/api/cart', async (req, res) => {
    try {
        await Cart.deleteMany();
        res.status(200).json({ message: 'All items removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
});


// เริ่มใช้งาน server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
