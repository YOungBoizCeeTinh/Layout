import React, { useState } from 'react';

const ProductForm = ({ onClose, onAddProduct, categories, brands,resetForm }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [images, setImages] = useState([]);
    const [priceError, setPriceError] = useState('');
    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files)); // Chuyển file list thành mảng
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Kiểm tra tên sản phẩm
        if (!name.trim()) {
            alert("Tên sản phẩm không được bỏ trống");
            return;
        }
    
        // Kiểm tra giá
        const parsedPrice = parseFloat(price);
        if (!parsedPrice || parsedPrice <= 0) {
            setPriceError('Giá sản phẩm không được bỏ trống và phải lớn hơn 0');
            return;
        }
    
        setPriceError(''); // Reset error nếu validation thành công
    
        // Chuyển đổi danh sách hình ảnh thành mảng đường dẫn nếu cần
        const imageUrls = Array.from(images).map(file => URL.createObjectURL(file));
    
        const productData = {
            name,
            price: parsedPrice,
            description,
            categoryId,
            brandId,
            images: imageUrls, // Gán ảnh vào dữ liệu sản phẩm
        };
    
        onAddProduct(productData); // Gọi hàm thêm sản phẩm
        onClose(); // Đóng modal sau khi thêm
    };
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2>Thêm Sản Phẩm Mới</h2>
                <form onSubmit={handleSubmit} style={styles.formContainer}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="number" // Đổi từ text sang number
                        placeholder="Giá"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <textarea
                        style={styles.textarea}
                        placeholder="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select style={styles.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Chọn thể loại</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select style={styles.select} value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
                        <option value="">Chọn thương hiệu</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="file"
                        style={styles.input}
                        multiple
                        onChange={handleImageChange}
                    />
                    <button style={styles.button} type="submit">Thêm sản phẩm</button>
                </form>
            </div>
        </div>
    );
};
const styles = {
    container: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px',
    },
    heading: {
        color: '#14919B',
        textAlign: 'center',
        marginBottom: '20px',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        border: '1px solid #0AD1C8',
        borderRadius: '5px',
        outline: 'none',
    },
    textarea: {
        padding: '10px',
        border: '1px solid #0AD1C8',
        borderRadius: '5px',
        outline: 'none',
        minHeight: '80px',
    },
    select: {
        padding: '10px',
        border: '1px solid #0AD1C8',
        borderRadius: '5px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#0AD1C8',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    editBtn: {
        backgroundColor: 'rgb(10, 209, 200)',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '8px 12px',
    },
    productList: {
        listStyleType: 'none',
        padding: '0',
        marginTop: '20px',
    },
    productItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    deleteButton: {
        backgroundColor: '#FF4C4C',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '8px 12px',
    },
    previewContainer: {
        marginTop: '20px',
        borderTop: '1px solid #ddd',
        paddingTop: '10px',
    },
    previewHeading: {
        color: '#0AD1C8',
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#999',
    },
    productDetails: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};
export default ProductForm;
