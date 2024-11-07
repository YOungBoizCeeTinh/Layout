import React, { Component } from 'react';
import InfoLeft from './InfoLeft';
import InfoProfile from './InfoProfile';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

// CSS-in-JS styles cho Main Layout
const layoutStyle = {
  backgroundColor: '#f7f9fc', // Màu nền nhẹ nhàng
  minHeight: '100vh', // Giữ chiều cao đầy đủ
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Đẩy Footer xuống dưới cùng
};

const containerStyle = {
  marginTop: '100px', // Đưa phần nội dung chính xuống dưới header
  padding: '20px', // Thêm padding để tạo khoảng trắng giữa nội dung
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between', // Tạo khoảng cách giữa các cột
};

const leftColumnStyle = {
  flex: '1', // Chiếm 25% màn hình
  paddingRight: '20px', // Thêm khoảng cách giữa cột trái và phải
};

const rightColumnStyle = {
  flex: '3', // Chiếm 75% màn hình
  padding: '20px',
  backgroundColor: '#ffffff', // Tạo card màu trắng cho phần nội dung chính
  borderRadius: '12px', // Bo góc cho card
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ cho card
};

// Header và Footer đã được thiết kế trước, nên không thay đổi.

export default class Info_Main extends Component {
  render() {
    return (
      <div style={layoutStyle}>
        <Header />
        <div className="container-fluid" style={containerStyle}>
          <div className="wrapper">
            <div style={rowStyle}>
              <div style={leftColumnStyle}>
                <InfoLeft />
              </div>
              <div style={rightColumnStyle}>
                <InfoProfile />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
