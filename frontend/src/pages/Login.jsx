import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Đảm bảo bạn đã cài react-router-dom
import "./Signup.css"; // CSS phù hợp
import axios from "axios";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
    // State để lưu trữ giá trị của các trường input và trạng thái
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Để ngăn spam submit
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang khi submit
        setError(null); // Reset trạng thái lỗi trước khi xử lý

        try {
            setIsSubmitting(true); // Đặt trạng thái đang xử lý
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", // Endpoint API cho đăng nhập
                { email, password } // Gửi email và password lên server
            );

            if (response.data?.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token); // Lưu token
                navigate("/NewVD"); // Chuyển hướng đến trang chính
            } else {
                throw new Error("Invalid login credentials.");
            }
        } catch (err) {
            console.error("Error while logging in:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to log in. Please try again.");
        } finally {
            setIsSubmitting(false); // Kết thúc trạng thái xử lý
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Log In</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                {/* Hiển thị lỗi nếu có */}
                {error && <div className="error-message">{error}</div>}

                {/* Input Email */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
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
                        onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="signup-button"
                    disabled={isSubmitting} // Ngăn submit khi đang xử lý
                >
                    {isSubmitting ? "Logging In..." : "Log In"}
                </button>

                {/* Link đến trang đăng ký */}
                <p className="text-center">
    Don't have an account?{" "}
    <Link to="/signup" className="link">
        Register
    </Link>
</p>

            </form>
        </div>
    );
};

export default Login;
