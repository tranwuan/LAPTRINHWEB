import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage({ productCategories }) {
    const { productId } = useParams();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [notification, setNotification] = useState('');

    // Tìm sản phẩm dựa trên productId
    let product = null;
    for (const category in productCategories) {
        product = productCategories[category].find(item => item.id.toString() === productId);
        if (product) {
            break;
        }
    }

    if (!product) {
        return <div style={styles.notFound}>Sản phẩm không tồn tại</div>;
    }

    const addToCart = () => {
        const existingProduct = cart.find(item => item.id === product.id);
        const updatedCart = existingProduct
            ? cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Hiển thị thông báo động
        setNotification(`${product.name} đã được thêm vào giỏ hàng.`);

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.productImageContainer}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
            </div>
            <div style={styles.productInfo}>
                <h2 style={styles.productName}>{product.name}</h2>
                <p style={styles.productPrice}>Giá: {product.price.toLocaleString()} VND</p>
                <p style={styles.productDescription}>Mô tả: {product.description || 'Mô tả chưa có sẵn.'}</p>
                <p style={styles.productRating}>
                    Đánh giá: {'★'.repeat(5)} {/* Đánh giá ngôi sao giả định */}
                </p>
                <button onClick={addToCart} style={styles.addToCartButton}>
                    Thêm vào giỏ hàng
                </button>
            </div>

            {/* Thông báo thêm vào giỏ hàng */}
            {notification && (
                <div style={styles.notification}>
                    {notification}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    productInfo: {
        flex: '1 1 50%',
        textAlign: 'left',
        marginLeft: '30px',
        display: 'flex',
        flexDirection: 'column',
    },
    productImageContainer: {
        flex: '1 1 40%',
        maxWidth: '400px',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    productName: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    productPrice: {
        fontSize: '24px',
        color: '#e53935',
        marginBottom: '15px',
    },
    productDescription: {
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#555',
        marginBottom: '20px',
    },
    productRating: {
        fontSize: '20px',
        color: '#FFD700',
    },
    notFound: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#FF5722',
        marginTop: '50px',
    },
    addToCartButton: {
        display: 'inline-block',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    addToCartButtonHover: {
        backgroundColor: '#218838',
    },
    notification: {
        position: 'fixed',
        top: '100px',
        right: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        fontSize: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        transition: 'opacity 0.3s ease',
    },
};

export default ProductDetailPage;
