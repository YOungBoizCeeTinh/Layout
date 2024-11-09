import React, { useState, useEffect } from 'react';
import { createCategory, getAllCategories, deleteCategory,updateCategory } from '../../services/categoryService';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); // Biến lưu trữ thông báo lỗi
  const [successMessage, setSuccessMessage] = useState(''); // Biến lưu trữ thông báo thành công
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // State cho popup thêm
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : data.result || []);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      setCategories([]);
    }
  };

  const addCategory = async () => {
    try {
      await createCategory({ name });
      resetForm();
      fetchCategories();
      setIsAddPopupOpen(false);
      setSuccessMessage('Thể loại đã được thêm thành công!'); // Hiển thị thông báo thành công
    } catch (error) {
      console.error('Error adding category:', error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
      setSuccessMessage('Thể loại đã xóa thành công!'); 
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };
  const handleEditCategory = (category) => {
    setEditCategory(category);
    setIsEditPopupOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
        const categoryId = Number(editCategory.id); // Sử dụng Number để chuyển đổi
        if (isNaN(categoryId) || categoryId <= 0) {
            throw new Error('ID không hợp lệ');
        }

        await updateCategory(categoryId, { name: editCategory.name });
        setIsEditPopupOpen(false);
        setSuccessMessage('Thể loại đã sửa thành công!'); // Hiển thị thông báo thành công
        fetchCategories();
    } catch (error) {
        console.error('Error updating category:', error.message);
        setSuccessMessage('');
    }
};

const openAddPopup = () => {
  setIsAddPopupOpen(true); // Mở popup thêm sản phẩm
};
const closeAddPopup = () => {
  setIsAddPopupOpen(false); // Đóng popup
  setName(''); // Reset input fields
  setSuccessMessage(''); // Reset thông báo thành công
  setErrorMessage(''); // Reset thông báo lỗi
};
  const resetForm = () => {
    setName('');
    setSuccessMessage(''); // Reset thông báo thành công
    setErrorMessage(''); // Reset thông báo lỗi
  };

  return (
    <div className='container-fluid'>
    <div className='brand'>
      <div className='brand-btn d-flex justify-content-start mb-3'>
        <button className='mr-2' style={styles.editBtn} onClick={openAddPopup}>Thêm Thể Loại</button>
      </div>  
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>} {/* Thông báo thành công */}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>} {/* Thông báo lỗi */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Thể Loại</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>

        {categories.length === 0 ? (
          <p style={styles.emptyMessage}>Chưa có sản phẩm nào.</p>
        ) : (
          <tbody >
            {categories.map((category, index) => (
              <tr key={category.id}>
                <th className='align-content-center' scope="row">{index + 1}</th>
                <td className='align-content-center'>{category.name}</td>
                <td className='align-content-center'>
                  <div>
                    <button className='mr-2' style={styles.editBtn} onClick={() => { handleEditCategory(category) }}>Sửa</button>
                    <button style={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {isEditPopupOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h4 style={styles.popupHeading}>Chỉnh sửa Thể loại</h4>
            <input
              style={styles.input}
              type="text"
              placeholder="Tên thể loại"
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} // Cập nhật đúng cách
            />
            <div style={styles.popupButtons}>
              <button style={styles.editBtn} onClick={handleSaveEdit}>Lưu</button>
              <button style={styles.deleteButton} onClick={() => setIsEditPopupOpen(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
      {isAddPopupOpen && ( // Popup thêm thương hiệu
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupHeading}>Thêm Thương Hiệu</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Tên thương hiệu"
              value={name}
              onChange={(e) => setName(e.target.value)} // Cập nhật tên thương hiệu
            />
            <div style={styles.popupButtons}>
              <button style={styles.editBtn} onClick={addCategory}>Lưu</button>
              <button style={styles.deleteButton} onClick={closeAddPopup}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
    
  );
};
const styles = {
  container: {
    backgroundColor: '#f8f9fa', // Thay đổi màu nền để nhẹ nhàng hơn
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  heading: {
    color: '#343a40',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '12px',
    border: '1px solid #0AD1C8',
    borderRadius: '5px',
    outline: 'none',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#0AD1C8',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#0a7e7a',
  },
  categoryList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
    alignItems: 'center',
  },
  categoryName: {
    fontWeight: 'bold',
    color: '#343a40',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '8px 12px',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  popupHeading: {
    color: '#333',
    marginBottom: '15px',
  },
  popupButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  editBtn: {
    backgroundColor: 'rgb(10, 209, 200)',
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
    fontStyle: 'italic',
  },
};

export default CategoryManagement;
