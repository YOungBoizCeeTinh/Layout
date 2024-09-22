import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, checkAndRefreshToken } from '../../services/authenticationService'; // Đảm bảo bạn đổi tên file service đúng
import User from '../User/User';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

const Main_Project = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Kiểm tra và làm mới token nếu gần hết hạn
        await checkAndRefreshToken();
        // Lấy role người dùng từ token
        const userRole = getUserRole();

        if (userRole === 'admin') {
          setRole('admin');
          navigate('/admin'); // Chuyển hướng đến trang admin nếu role là admin
        } else if (userRole === 'user') {
          setRole('user');
          navigate('/user'); // Chuyển hướng đến trang user nếu role là user
        } else {
          throw new Error('Vai trò không hợp lệ');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra vai trò người dùng:', error);
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div>
      {role === 'admin' ? <AdminDashboard /> : <User />}
    </div>
  );
};

export default Main_Project;
