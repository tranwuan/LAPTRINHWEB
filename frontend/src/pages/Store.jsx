import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Store() {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [successMessage, setSuccessMessage] = useState(''); // State lưu thông báo thành công

    const products = {
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

    const categories = ['Tất cả', ...Object.keys(products)];
    const filteredProducts = selectedCategory === 'Tất cả' 
        ? Object.values(products).flat()
        : products[selectedCategory];

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        const updatedCart = existingProduct
            ? cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Cập nhật thông báo khi thêm sản phẩm vào giỏ hàng
        setSuccessMessage(`${product.name} Đã được thêm vào giỏ hàng!`);

        // Đặt lại thông báo sau 3 giây
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Laptopvui</h1>
            </header>
            <main style={styles.main}>
                <section style={styles.leftPanel}>
                    <h2>Danh mục</h2>
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        style={styles.select}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </section>
                <section style={styles.products}>
                    {filteredProducts.map(product => (
                        <div key={product.id} style={styles.product}>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                style={styles.productImage} 
                            />
                            <h3 style={styles.productName}>{product.name}</h3>
                            <p style={styles.productPrice}>
                                {product.price.toLocaleString()} VND
                            </p>
                            <button 
                                style={styles.button} 
                                onClick={() => addToCart(product)}
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <Link to={`/product/${product.id}`} style={styles.detailLink}>
                                Xem chi tiết
                            </Link>
                        </div>
                    ))}
                </section>
            </main>
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>} {/* Hiển thị thông báo với tên sản phẩm */}
            <footer style={styles.footer}>
                <p>&copy; 2024 Laptopvui</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        backgroundColor: '#1f2937',
        padding: '30px 20px',
        textAlign: 'center',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        margin: 0,
        fontSize: '2.8rem',
        fontWeight: 'bold',
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '30px',
    },
    leftPanel: {
        flex: '1 1 20%',
        padding: '15px',
        minWidth: '200px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        marginRight: '20px',
    },
    select: {
        padding: '12px',
        fontSize: '16px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
    },
    products: {
        flex: '3 1 75%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '20px',
    },
    product: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        transition: 'transform 0.3s ease',
        marginBottom: '15px',
    },
    productName: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    productPrice: {
        fontSize: '16px',
        color: '#007bff',
        margin: '10px 0',
        fontWeight: 'bold',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
        backgroundColor: '#45a049',
        transform: 'scale(1.05)',
    },
    footer: {
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '14px',
        color: '#555',
        padding: '20px 0',
        borderTop: '1px solid #ccc',
    },
    detailLink: {
        display: 'inline-block',
        marginTop: '10px',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '14px',
    },
    successMessage: {
        position: 'fixed',
        top: '80px',
        right: '10px',  // Đặt thông báo ở bên tay phải
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '5px',
        zIndex: '9999',
    }
};


export default Store;
