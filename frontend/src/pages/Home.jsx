import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Trạng thái tìm kiếm

    // Lấy giỏ hàng từ localStorage khi trang được tải lại
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
        } else {
            const newCart = [...cart, { ...product, quantity: 1 }];
            setCart(newCart);
        }

        // Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng
        setNotification(`${product.name} đã được thêm vào giỏ hàng.`);
        
        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            removeFromCart(productId);
        }
    };

    const productCategories = {
        'DELL': [
            { id: 1, name: 'Dell Latitude E5550', price: 15000000, image: 'https://i5.walmartimages.com/asr/3a0b16b3-88f9-4797-a546-8a7a5f3d15cc.9cd02e837eeb8ced4ef44bdac35a84e9.jpeg' },
            { id: 2, name: 'DELL Latitude 5440', price: 17506000, image: 'https://i.ebayimg.com/images/g/edUAAOSw6Z5m24UH/s-l1600.webp' },
            { id: 3, name: 'DELL Latitude 5490', price: 15516000, image: 'https://i.ebayimg.com/images/g/CVwAAOSww2lnLk83/s-l1600.webp' },
            { id: 4, name: 'DELL Alienware X15 R1 15', price: 36000000, image: 'https://i.ebayimg.com/images/g/kP0AAOSw-NRnLk9t/s-l1600.webp' },
            { id: 17, name: 'Dell XPS 13 ', price: 39000000, image: 'https://i.ebayimg.com/images/g/iG0AAOSwnsNlqLGK/s-l1600.webp' },
        ],
        'HP': [
            { id: 7, name: 'HP 255 G10 Laptop Ryzen 7', price: 18000000, image: 'https://i.ebayimg.com/images/g/AhQAAOSwZpxnLlCc/s-l960.webp' },
            { id: 8, name: 'HP 15-DW3363ST ', price: 8500000, image: 'https://i.ebayimg.com/images/g/bQUAAOSwCCFnQOwK/s-l1600.webp' },
            { id: 9, name: 'HP EliteBook 645 G10 Laptop Ryzen 5 ', price: 24000000, image: 'https://i.ebayimg.com/images/g/w40AAOSwnX1nLlB0/s-l1600.webp' },
            { id: 10, name: 'HP Envy 17', price: 64000000, image: 'https://i.ebayimg.com/images/g/HNAAAOSw1qZk8HnK/s-l1600.webp' },
            { id: 18, name: 'HP Victus 15.6', price: 64000000, image: 'https://i.ebayimg.com/images/g/W~AAAOSw0QdnCnD7/s-l1600.webp' }

        ],
        'ACER': [
            { id: 13, name: 'Acer Swift Go SFG16-71-52SD', price: 15000000, image: 'https://i.ebayimg.com/images/g/tywAAOSw0kJlrZDA/s-l1600.webp' },
            { id: 14, name: 'Acer Nitro V 16 ', price: 24532000, image: 'https://i.ebayimg.com/images/g/M68AAOSw~bFm1g~C/s-l1600.webp' },
            { id: 15, name: 'Acer Nitro V ANV15-51-789J', price: 25050400, image: 'https://i.ebayimg.com/images/g/vn4AAOSwh8hmbJ0Y/s-l1600.webp' },
            { id: 16, name: 'Acer Nitro 5 AN515-58', price: 2800000, image: 'https://i.ebayimg.com/images/g/VzkAAOSwhWRmFUl~/s-l1600.webp' },
            { id: 19, name: 'Acer Predator Helios Neo', price: 2800000, image: 'https://i.ebayimg.com/images/g/eToAAOSw~59nOdQR/s-l1600.webp' },
        ],
    };

    // Hàm lọc sản phẩm theo tên hoặc hãng
    const filterProducts = (product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               Object.keys(productCategories).some(category => 
                   category.toLowerCase().includes(searchTerm.toLowerCase()) && 
                   productCategories[category].includes(product)
               );
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <h1 style={styles.logo}>Laptopvui</h1>
                </div>
                <div style={styles.searchContainer}>
                    <input 
                        type="text" 
                        style={styles.searchInput} 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật trạng thái tìm kiếm
                    />
                </div>
            </header>

            <main style={styles.main}>
                {notification && (
                    <div style={styles.notification}>
                        {notification}
                    </div>
                )}
                {Object.keys(productCategories).map(category => (
                    <section style={styles.section} key={category}>
                        <h2 style={styles.categoryTitle}>{category}</h2>
                        <div style={styles.productsGrid}>
                            {productCategories[category]
                                .filter(filterProducts) // Áp dụng lọc sản phẩm
                                .map(product => (
                                    <div
                                        key={product.id}
                                        style={styles.productCard}
                                        onMouseEnter={e => e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
                                        onMouseLeave={e => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
                                    >
                                        <div style={styles.productImageContainer}>
                                            <img src={product.image} alt={product.name} style={styles.productImage} />
                                        </div>
                                        <p style={styles.productName}>{product.name}</p>
                                        <p style={styles.productPrice}>
                                            {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </p>
                                        <button
                                            style={styles.detailsButton}
                                            onClick={() => addToCart(product)}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                        <Link to={`/product/${product.id}`} style={styles.detailsLink}>
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </section>
                ))}
            </main>

            <footer style={styles.footer}>
                <p>&copy; 2024 Laptopvui. Mọi quyền được bảo lưu.</p>
                <p>Địa chỉ: 123 Đường ABC, Quận Bình Thạnh, TP.HCM</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#f5f5f5',
        color: '#333',
        minHeight: '100vh',
    },
    header: {
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    logoContainer: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    logo: {
        margin: 0,
        color: '#ff6b00',
    },
    searchContainer: {
        marginLeft: '20px',
        flex: 1,
        maxWidth: '300px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        color: '#000', // Màu chữ sẽ là đen
    },
    main: {
        padding: '20px',
    },
    section: {
        marginBottom: '40px',
    },
    categoryTitle: {
        fontSize: '22px',
        color: '#212529',
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
    },
    productCard: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        transition: 'box-shadow 0.3s',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    productImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
    },
    productImage: {
        maxWidth: '100%',
        maxHeight: '150px',
        objectFit: 'contain',
    },
    productName: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    productPrice: {
        fontSize: '16px',
        color: '#007bff',
        marginBottom: '15px',
    },
    detailsButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    detailsLink: {
        marginTop: '10px',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '16px',
    },
    footer: {
        backgroundColor: '#1f2937',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
    },
    notification: {
        position: 'fixed',
        top: '200px',
        right: '10px',  // Đổi từ left thành right
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 1000,
        fontSize: '15px',
        fontWeight: 'bold',
    },
};

export default Home;
