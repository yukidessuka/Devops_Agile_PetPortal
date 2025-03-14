const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Add cors

// สร้างแอพ Express
const app = express();

// ใช้ body-parser เพื่อ parse ข้อมูลจากฟอร์ม
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ใช้ CORS
app.use(cors());

// เชื่อมต่อกับ MongoDB (อย่าลืมแก้ไข URL ใน connection string ตามที่ต้องการ)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petcare', {
    authSource: 'admin'
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Schema ของข้อมูล login
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema, 'users'); // Specify collection name 'users'

// Route สำหรับการสมัครสมาชิก (POST request)
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างเอกสารใหม่ใน MongoDB
        const newUser = new User({ username, email, password: hashedPassword });

        // บันทึกข้อมูล
        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        res.status(400).send('Error saving user: ' + err);
    }
});

// Route สำหรับการเข้าสู่ระบบ (POST request)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ username: user.username }); // ส่งชื่อผู้ใช้กลับไปใน response
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Error logging in: ' + err);
    }
});

// กำหนดให้เซิร์ฟเวอร์ฟังที่พอร์ต 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
