import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // CSS phù hợp
import axios from "axios";

const Signup = () => {
    // State để lưu trữ giá trị input và trạng thái
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Để lưu lỗi từ API
    const [isSubmitting, setIsSubmitting] = useState(false); // Để ngăn spam submit
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        setError(null); // Reset lỗi trước khi xử lý

        // Kiểm tra độ dài mật khẩu trước khi gửi API
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            setIsSubmitting(true); // Đặt trạng thái đang xử lý
            const response = await axios.post(
                "http://localhost:5000/api/auth/register", // Endpoint API
                { name, email, password } // Dữ liệu gửi lên server
            );
            if (response.data.success) {
                navigate("/login"); // Điều hướng đến trang đăng nhập
            }
        } catch (err) {
            console.error("Error while registering user:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to create account. Please try again.");
        } finally {
            setIsSubmitting(false); // Kết thúc xử lý
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Create an Account</h2>

            {/* Hiển thị lỗi nếu có */}
            {error && <div className="error-message">{error}</div>}

            <form className="signup-form" onSubmit={handleSubmit}>
                {/* Input Name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Input Email */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Input Password */}
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="signup-button"
                    disabled={isSubmitting} // Ngăn spam nút khi đang gửi
                >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="link">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
