import React from 'react';

function Contact() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Liên hệ với chúng tôi</h1>
            </header>
            <main style={styles.main}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Thông tin liên hệ</h2>
                    <p style={styles.infoText}>Email: <a href="mailto:support@laptopvui.com" style={styles.link}>support@laptopvui.com</a></p>
                    <p style={styles.infoText}>Điện thoại: <span style={styles.link}>0123 456 789</span></p>
                    <p style={styles.infoText}>Địa chỉ: 123 Đường ABC, Quận Bình Thạnh, TP. Hồ Chí Minh</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Mẫu biểu liên hệ</h2>
                    <form style={styles.form}>
                        <label style={styles.label}>Tên:</label>
                        <input type="text" name="name" style={styles.input} />

                        <label style={styles.label}>Email:</label>
                        <input type="email" name="email" style={styles.input} />

                        <label style={styles.label}>Tin nhắn:</label>
                        <textarea name="message" style={styles.textarea}></textarea>

                        <button type="submit" style={styles.button}>Gửi</button>
                    </form>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Bản đồ</h2>
                    <div style={styles.map}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4515552701224!2d106.69767041480099!3d10.77725969232053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752efd5a155f6b%3A0x2f76e1fcf8a0af2d!2s123%20%C4%90%C6%B0%E1%BB%9Dng%20ABC%2C%20Ph%C6%B0%E1%BB%9Dng%20B%E1%BA%BFn%20Ngh%C3%A9%2C%20Qu%E1%BA%ADn%201%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1623308985660!5m2!1sen!2sus" 
                            width="100%" 
                            height="450" 
                            style={styles.mapIframe} 
                            allowFullScreen=""
                            loading="lazy" 
                            title="Google Map">
                        </iframe>
                    </div>
                </section>
            </main>
            <footer style={styles.footer}>
                <p style={styles.footerText}>&copy; 2024 Laptopvui. Mọi quyền được bảo lưu.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#f9fafb',  // Light grey background for a soft, neutral tone
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#1f2937',  // A deeper, more sophisticated green
        padding: '15px',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    main: {
        margin: '30px 0',
    },
    section: {
        margin: '30px 0',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        fontSize: '24px',
        color: '#1f2937',  // Use a matching green for section titles
        marginBottom: '15px',
    },
    infoText: {
        fontSize: '18px',
        color: '#333',  // Darker grey for text to enhance readability
        margin: '10px 0',
    },
    link: {
        color: '#00796b',  // Match link color to header and title
        textDecoration: 'none',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
        width: '100%',
        textAlign: 'left',
    },
    input: {
        padding: '12px',
        marginBottom: '15px',
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    textarea: {
        padding: '12px',
        marginBottom: '15px',
        width: '100%',
        height: '120px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '12px 25px',
        backgroundColor: '#00796b',  // Matching green color for buttons
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#004d40',  // Darker shade of green on hover
    },
    map: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    mapIframe: {
        borderRadius: '10px',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '15px',
        marginTop: '30px',
        textAlign: 'center',
    },
    footerText: {
        color: '#333',  // Consistent dark grey for footer text
        fontSize: '14px',
    }
};

export default Contact;
