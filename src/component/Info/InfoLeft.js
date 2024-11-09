import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/userService'; // Chỉ cần import hàm lấy thông tin người dùng
import '../../asserts/InfoLeft.css';

export default class Info extends Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = async () => {
    try {
      const userData = await getCurrentUser(); // Gọi API để lấy thông tin người dùng
      console.log('Dữ liệu người dùng:', userData); // Kiểm tra dữ liệu người dùng
      this.setState({ user: userData.result, loading: false }); // Cập nhật đúng trường user
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
      this.setState({ loading: false }); // Cập nhật trạng thái loading
    }
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <p>Đang tải thông tin người dùng...</p>; // Hiển thị thông báo khi đang tải
    }

    return (
      <div className="info-left">
        <div className="info-top d-flex align-items-center">
          <div className="user-left mr-3">
            <img
              style={{ width: 80, height: 80, borderRadius: '50%' }}
              src={user?.avatar || require('../../asserts/ProductImg/icon/user2.png')} // Dùng avatar từ user nếu có, nếu không dùng ảnh mặc định
              alt="avatar"
            />
          </div>
          <div className="user-right">
            <div className="user-title d-flex align-items-center">
              <p className="mb-0">{user?.username || 'Người dùng'}</p> {/* Hiển thị tên người dùng */}
            </div>
          </div>
        </div>

        <div className="info-bottom mt-4">
          <div className="user-table">
            <div className="info">
              <ul className="info-list list-unstyled">
                <li className="d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
                  <div className="icon-user mr-3">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  Tài Khoản Của Tôi
                </li>
                <Link to="/myinfo" className="info-link">
                  <li className="info-item">Hồ Sơ</li>
                </Link>
                <Link to="/pw" className="info-link">
                  <li className="info-item">Đổi Mật Khẩu</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
