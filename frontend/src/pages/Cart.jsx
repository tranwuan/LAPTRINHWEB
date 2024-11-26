import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);  
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cash',
        transferMethod: '',
    });
    const [notification, setNotification] = useState('');  // State để lưu thông báo
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const saveCartToLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId, productName) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);

        // Hiển thị thông báo xóa sản phẩm
        setNotification(`${productName} đã được xóa khỏi giỏ hàng.`);

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity > 1) {
            const updatedCart = cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
        } else {
            removeFromCart(productId, product.name);  // Gọi hàm xóa và truyền tên sản phẩm
        }
    };

    const handleCheckout = () => {
        // Open the checkout modal
        setShowCheckout(true);
    };

    const handleCloseCheckout = () => {
        // Close the checkout modal
        setShowCheckout(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Thông tin thanh toán:', formData);
        alert('Xác nhận đơn hàng!');
        setCart([]);
        localStorage.removeItem('cart');
        setShowCheckout(false);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString();

    return (
        <section className="cart-container">
            <h2 className="cart-title">Giỏ hàng</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">Giỏ hàng trống</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">Giá: {item.price.toLocaleString()} VND</p>
                                    <p className="cart-item-quantity">Số lượng: {item.quantity}</p>
                                </div>
                                <div className="cart-item-controls">
                                    <button onClick={() => decreaseQuantity(item.id)} className="control-button">-</button>
                                    <span className="cart-item-quantity-display">{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)} className="control-button">+</button>
                                    <button onClick={() => removeFromCart(item.id, item.name)} className="remove-button">Xóa</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <p>Tổng tiền: {totalAmount} VND</p>
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
                </div>
            )}

            {notification && <div className="notification">{notification}</div>}  {/* Hiển thị thông báo */}

            {/* Modal Checkout Form */}
            <div className={`checkout-modal ${showCheckout ? 'show' : ''}`} onClick={handleCloseCheckout}>
                <div className="checkout-form-container" onClick={e => e.stopPropagation()}>
                    <button className="close-button" onClick={handleCloseCheckout}>X</button>
                    <h2>Thông tin thanh toán</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Tên:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="paymentMethod">Hình thức thanh toán:</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleFormChange}
                            >
                                <option value="cash">Thanh toán trực tiếp</option>
                                <option value="bankTransfer">Chuyển khoản</option>
                            </select>
                        </div>
                        {formData.paymentMethod === 'bankTransfer' && (
                            <div className="input-group">
                                <label htmlFor="transferMethod">Chọn phương thức chuyển khoản:</label>
                                <select
                                    id="transferMethod"
                                    name="transferMethod"
                                    value={formData.transferMethod}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">Chọn phương thức</option>
                                    <option value="momo">Momo</option>
                                    <option value="bank">Ngân hàng</option>
                                </select>
                            </div>
                        )}
                        <button type="submit" className="submit-button">Xác nhận thanh toán</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Cart;
