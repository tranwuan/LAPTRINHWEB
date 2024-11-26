import React from 'react';

function NewProducts() {
    const newProducts = [
        {
            id: 1,
            name: 'HP ra mắt 4 mẫu laptop mới: CPU Intel thế hệ 13. Chỉ từ 11.5 triệu đồng',
            description: 'Cả hai chiếc laptop trông giống hệt nhau, sự khác biệt nằm ở kích thước màn hình. Biến thể màn hình 15,6 inch bao gồm CPU Intel Core i5 thế hệ thứ 13 và nặng 1,6 kg. Trong khi đó model 14 inch mang CPU Core i3 thế hệ thứ 13 và nặng 1,4kg. Cả hai đều được trang bị màn hình LCD với độ phân giải Full-HD (1920×1080 pixel) và có lớp phủ chống lóa. ',
            image: 'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/04/HP-0.jpg.webp',
            releaseDate: '08/2024'
        },
        {
            id: 2,
            name: 'Laptop HP mới ra mắt đã cập bến, giá chỉ từ 11.79 triệu, giảm thêm đến 500K cho HSSV',
            description: 'Laptop HP mới cập bến Thế Giới Di Động thêm nhiều mẫu mới toanh, giá cực ưu đãi chỉ còn từ 11.79 triệu đồng. Chưa hết, trong giai đoạn từ giờ đến hết tháng 06, nếu bạn là học sinh sinh viên còn được giảm thêm đến 500K',
            image: 'https://cdn.tgdd.vn/News/1566800/hp-1280x720.jpeg',
            releaseDate: '09/2024'
        },
        {
            id: 3,
            name: 'ASUS Zenbook S 14 mới – Thế hệ laptop AI Intel Copilot+ PC đầu tiên',
            description: 'Laptop AI 14” mỏng nhất kết hợp sức mạnh của AI từ chip Intel Core Ultra (Series 2) mới nhất cùng thiết kế sang trọng với lớp phủ nhôm gốm độc quyền ASUS Ceraluminum™ là một sản phẩm thuộc phân khúc cao cấp được thiết kế chỉn chu từ trong ra ngoài và là một lựa chọn tốt cho người dùng.',
            image: 'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/11/Thiet-ke-chua-co-ten-1536x803.png.webp',
            releaseDate: '10/2024'
        },
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Sản phẩm mới</h1>
            </header>
            <main style={styles.main}>
                <section style={styles.products}>
                    {newProducts.map(product => (
                        <div key={product.id} style={styles.product}>
                            <img src={product.image} alt={product.name} style={styles.productImage} />
                            <div style={styles.productInfo}>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <p style={styles.productDescription}>{product.description}</p>
                                <p><strong>Ngày ra mắt:</strong> {product.releaseDate}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <footer style={styles.footer}>
                <p>&copy; 2024 Laptopvui. Mọi quyền được bảo lưu.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f6f9', // Light background for page
        color: '#333',
    },
    header: {
        backgroundColor: '#1f2937', // Consistent green for header (matches theme)
        padding: '20px',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        margin: 0,
        fontSize: '2.5rem',
        fontWeight: 'bold',
    },
    main: {
        marginTop: '30px',
        textAlign: 'center',
    },
    products: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '20px',
    },
    product: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '300px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#fff',  // Light background to match overall theme
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '15px',
        transition: 'transform 0.3s ease',
    },
    productInfo: {
        color: '#555',
    },
    productName: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#2c3e50',  // Dark color for text for better contrast
        marginBottom: '10px',
    },
    productDescription: {
        fontSize: '1rem',
        color: '#7f8c8d',  // Softer grey for description to avoid harsh contrast
        marginBottom: '15px',
        lineHeight: '1.5',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '15px',
        marginTop: '30px',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
    },
};

export default NewProducts;
