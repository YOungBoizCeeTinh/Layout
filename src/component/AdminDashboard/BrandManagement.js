import React, { useState, useEffect } from 'react';
import { createBrand, getAllBrands, updateBrand, deleteBrand as deleteBrandService } from '../../services/brandService'; // Import các dịch vụ

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Biến lưu trữ thông báo lỗi
  const [successMessage, setSuccessMessage] = useState(''); // Biến lưu trữ thông báo thành công
  const [editBrand, setEditBrand] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // State cho popup thêm
  useEffect(() => {
    fetchBrands(); // Tải dữ liệu thương hiệu khi component mount
  }, []);

  const fetchBrands = async () => {
    try {
      const data = await getAllBrands();
      setBrands(Array.isArray(data) ? data : data.result || []);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      setBrands([]);
    }
  };
  const addBrand = async () => {
    if (!name || !description) {
      setErrorMessage('Vui lòng nhập đầy đủ tên và mô tả thương hiệu.');
      return;
    }
    try {
      await createBrand({ name, description }); // Tạo thương hiệu mới
      setSuccessMessage('Thương hiệu đã được thêm thành công!'); // Hiển thị thông báo thành công
      fetchBrands(); // Tải lại danh sách thương hiệu
      setName(''); // Reset input fields after adding
      setDescription('');
      setErrorMessage(''); // Reset thông báo lỗi
      setIsAddPopupOpen(false);
    } catch (error) {
      setErrorMessage(error.message); // Hiển thị thông báo lỗi nếu có
    }
  };
  const deleteBrand = async (id) => {
    try {
      await deleteBrandService(id); // Xóa thương hiệu
      setSuccessMessage('Thương hiệu đã được xóa thành công!'); // Hiển thị thông báo thành công
      fetchBrands(); // Tải lại danh sách thương hiệu
      setErrorMessage(''); // Reset thông báo lỗi
    } catch (error) {
      setErrorMessage(error.message); // Hiển thị thông báo lỗi nếu có
    }
  };
  const handleEditBrand = (brand) => {
    setEditBrand({ ...brand }); // Đảm bảo rằng bạn đang sao chép đối tượng thương hiệu
    setIsEditPopupOpen(true); // Mở popup chỉnh sửa
  };

  const handleSaveEdit = async () => {
    try {
      const brandId = editBrand.id; // Lấy giá trị id từ editBrand

      if (brandId === undefined || brandId === null) {
        throw new Error('ID không hợp lệ'); // Thông báo nếu không có ID
      }

      const parsedBrandId = Number(brandId); // Chuyển đổi ID thành số
      console.log('Giá trị brandId:', parsedBrandId); // Log giá trị brandId

      // Kiểm tra giá trị brandId
      if (isNaN(parsedBrandId) || parsedBrandId <= 0) {
        throw new Error('ID không hợp lệ');
      }

      if (!editBrand.name || !editBrand.description) {
        throw new Error('Vui lòng nhập đầy đủ tên và mô tả thương hiệu.');
      }

      await updateBrand(parsedBrandId, { name: editBrand.name, description: editBrand.description });
      setIsEditPopupOpen(false);
      setSuccessMessage('Thương hiệu đã sửa thành công!'); // Hiển thị thông báo thành công
      fetchBrands();
    } catch (error) {
      console.error('Error updating brand:', error.message);
      setErrorMessage(error.message); // Hiển thị thông báo lỗi nếu có
      setSuccessMessage('');
    }
  };
  const openAddPopup = () => {
    setIsAddPopupOpen(true); // Mở popup thêm sản phẩm
  };
  const closeAddPopup = () => {
    setIsAddPopupOpen(false); // Đóng popup
    setName(''); // Reset input fields
    setDescription('');
    setSuccessMessage(''); // Reset thông báo thành công
    setErrorMessage(''); // Reset thông báo lỗi
  };
  return (
    <div>
      <div className='container-fluid'>
        <div className='brand'>
          <div className='brand-btn d-flex justify-content-start mb-3'>
            <button className='mr-2' style={styles.editBtn} onClick={openAddPopup}>Thêm Thương Hiệu</button>
          </div>  
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>} {/* Thông báo thành công */}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>} {/* Thông báo lỗi */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Thể Loại</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            {brands.length === 0 ? (
              <p style={styles.emptyMessage}>Chưa có sản phẩm nào.</p>
            ) : (
              <tbody >
                {brands.map((brand, index) => (
                  <tr key={brand.id}>
                    <th className='align-content-center' scope="row">{index + 1}</th>
                    <td className='align-content-center'>{brand.name}</td>
                    <td className='align-content-center'>{brand.description}</td>
                    <td className='align-content-center'>
                      <div>
                        <button className='mr-2' style={styles.editBtn} onClick={() => { handleEditBrand(brand) }}>Sửa</button>
                        <button style={styles.deleteButton} onClick={() => deleteBrand(brand.id)}>Xóa</button>
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
                <h4 style={styles.popupHeading}>Chỉnh sửa Thương Hiệu</h4>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Tên thương hiệu"
                  value={editBrand.name}
                  onChange={(e) => setEditBrand({ ...editBrand, name: e.target.value })} // Cập nhật đúng cách
                />
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Mô tả"
                  value={editBrand.description}
                  onChange={(e) => setEditBrand({ ...editBrand, description: e.target.value })} // Cập nhật đúng cách
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
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Cập nhật mô tả
                />
                <div style={styles.popupButtons}>
                  <button style={styles.editBtn} onClick={addBrand}>Lưu</button>
                  <button style={styles.deleteButton} onClick={closeAddPopup}>Hủy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
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
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#0AD1C8',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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
  brandList: {
    listStyleType: 'none',
    padding: 0,
  },
  brandItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
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
  editBtn: {
    backgroundColor: 'rgb(10, 209, 200)',
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
};

export default BrandManagement;
