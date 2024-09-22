import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Điều hướng trong React Router
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import BrandManagement from './BrandManagement';
import UserManagement from './UserManagement';
import { logout, getUserRole } from '../../services/authenticationService';

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('category');
    const navigate = useNavigate();
  
    useEffect(() => {
      const role = getUserRole();
      console.log("Role từ token:", role); // In ra vai trò để kiểm tra
      
      // Kiểm tra nếu vai trò không phải USER ADMIN, điều hướng về trang chủ
      if (!role || !role.includes('ADMIN')) {
        navigate('/'); // Điều hướng nếu không phải USER ADMIN
      }
    }, [navigate]);
  
    const handleLogout = () => {
      logout();
      window.location.href = '/login';
    };
  
  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
        <ul style={styles.menuList}>
          <li 
            onClick={() => setActiveTab('category')} 
            style={{...styles.menuItem, ...(activeTab === 'category' ? styles.active : {})}}
          >
            Quản lý Thể loại
          </li>
          <li 
            onClick={() => setActiveTab('product')} 
            style={{...styles.menuItem, ...(activeTab === 'product' ? styles.active : {})}}
          >
            Quản lý Sản phẩm
          </li>
          <li 
            onClick={() => setActiveTab('brand')} 
            style={{...styles.menuItem, ...(activeTab === 'brand' ? styles.active : {})}}
          >
            Quản lý Thương hiệu
          </li>
          <li 
            onClick={() => setActiveTab('user')} 
            style={{...styles.menuItem, ...(activeTab === 'user' ? styles.active : {})}}
          >
            Quản lý Người dùng
          </li>
        </ul>
        <button style={styles.logoutBtn} onClick={handleLogout}>Đăng xuất</button>
      </div>
      <div style={styles.content}>
        {activeTab === 'category' && <CategoryManagement />}
        {activeTab === 'product' && <ProductManagement />}
        {activeTab === 'brand' && <BrandManagement />}
        {activeTab === 'user' && <UserManagement />}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#0AD1C8',
    padding: '20px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  sidebarTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
  },
  menuItem: {
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  active: {
    backgroundColor: '#14919B',
  },
  logoutBtn: {
    backgroundColor: '#FF4C4C',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    width: '90%',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
};

export default AdminDashboard;
