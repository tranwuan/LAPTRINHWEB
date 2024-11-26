// components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import logo from "../assets/lap.jpg"; // Thêm import logo

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      console.log("Đang thực hiện đăng xuất...");
      logout(); // Thực hiện logout
      navigate("/"); // Điều hướng về trang chủ (trang đăng nhập)
      console.log("Đăng xuất thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          <img src={logo} alt="LapTopVui Logo" className="h-20" /> {/* Cập nhật đường dẫn logo */}
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/store" className="hover:text-blue-400">
            Cửa hàng
          </Link>
        </li>
        <li>
          <Link to="/news" className="hover:text-blue-400">
            Tin tức
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-blue-400">
            Giỏ hàng
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-400">
            Liên hệ
          </Link>
        </li>
      </ul>

      {/* User Section */}
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
              Đăng nhập
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
              Đăng ký
            </Link>
          </>
        ) : (
          <>
  <span className="mr-4">
    Xin chào,{' '}
    <Link to="/NewVD" className="font-bold text-blue-500 hover:text-blue-700">
      {user.name}
    </Link>
  </span>
  <button
    onClick={handleLogout}
    className="bg-red-500 px-4 py-2 rounded"
  >
    Đăng xuất
  </button>
</>
        )}
      </div>
    </nav>
  );
};

export default Navbar;