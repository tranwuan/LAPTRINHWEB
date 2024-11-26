import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newProduct = { name, price, image };

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
      setSuccessMessage("Cập nhật sản phẩm thành công!");
      setHighlightedIndex(editIndex);
    } else {
      const newIndex = products.length;
      setProducts([...products, newProduct]);
      setSuccessMessage("Thêm sản phẩm thành công!");
      setHighlightedIndex(newIndex);
    }

    setName("");
    setPrice("");
    setImage("");
    setShowForm(false);

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setName("");
    setPrice("");
    setImage("");
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEditProduct = (index) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    // Reset hiệu ứng nếu sản phẩm bị xóa là sản phẩm được highlight
    if (highlightedIndex === index) {
      setHighlightedIndex(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          {successMessage}
        </div>
      )}

      <button
        className="fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-teal-600 transition"
        onClick={() => setShowForm(!showForm)}
      >
        <FaPlus size={24} />
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
              {editIndex !== null ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
            </h1>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Tên sản phẩm:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Giá tiền (VNĐ):
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Nhập giá tiền"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Hình ảnh (URL):
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Nhập URL hình ảnh"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-teal-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition mr-2"
                >
                  {editIndex !== null ? "Cập Nhật" : "Thêm Sản Phẩm"}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition ml-2"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hiển thị danh sách sản phẩm */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`bg-white shadow rounded-lg p-4 text-center ${
              highlightedIndex === index
                ? "border-2 border-black transform translate-x-2 translate-y-3"
                : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-md mb-4"
              style={{ maxHeight: "160px" }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
            <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
            <p className="text-teal-600 font-semibold">
              {parseInt(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => handleEditProduct(index)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                <FaEdit /> Sửa
              </button>
              <button
                onClick={() => handleDeleteProduct(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <FaTrash /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProductForm;
