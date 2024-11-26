import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route để đăng ký
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kiểm tra nếu thiếu trường thông tin nào
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Kiểm tra xem user đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Lưu user vào database
        await newUser.save();

        return res.status(200).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        console.error("Error in adding user:", error.message);
        return res.status(500).json({ success: false, message: "Error in adding user" });
    }
});

// Route để đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra nếu thiếu trường thông tin nào
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password." });
        }

        // Kiểm tra xem user có tồn tại không
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User does not exist." });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Wrong credentials." });
        }

        // Tạo token
        const token = jwt.sign(
            { id: existingUser._id }, // Payload
            "secretkeyoftechapp123@#", // Secret key
            { expiresIn: "5h" } // Thời hạn token
        );

        // Trả về kết quả thành công
        return res.status(200).json({
            success: true,
            token,
            user: { name: existingUser.name },
            message: "Login successfully.",
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ success: false, message: "Error in Login." });
    }
});

export default router;
