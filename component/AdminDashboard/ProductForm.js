import React, { useState, useEffect } from 'react';

const ProductForm = ({ onClose, onAddProduct, categories, brands}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [images, setImages] = useState([]);
    const [chip, setChip] = useState('');
    const [ram, setRam] = useState('');
    const [screen, setScreen] = useState('');
    const [cart, setCart] = useState('');


    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files)); // Chuyển file list thành mảng
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || parseFloat(price) <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm và giá phải lớn hơn 0");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", parseFloat(price));
        formData.append("description", description);
        formData.append("categoryId", categoryId);
        formData.append("brandId", brandId);
        formData.append("chip", chip);
        formData.append("ram", ram);
        formData.append("screen", screen);
        formData.append("cart", cart);

        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        onAddProduct(formData);
        onClose();
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
                        type="number"
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

                    {/* Các trường bổ sung */}
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Chip"
                        value={chip}
                        onChange={(e) => setChip(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="RAM"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Màn hình"
                        value={screen}
                        onChange={(e) => setScreen(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Card đồ họa"
                        value={cart}
                        onChange={(e) => setCart(e.target.value)}
                    />

                    <input
                        type="file"
                        style={styles.input}
                        multiple
                        onChange={handleImageChange}
                    />

                    <div style={styles.buttonGroup}>
                        <button style={styles.button} type="submit">Thêm sản phẩm</button>
                        <button style={styles.cancelButton} type="button" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
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
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
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
    cancelButton: {
        padding: '10px',
        backgroundColor: '#FF4C4C',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
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
