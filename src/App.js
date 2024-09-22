import logo from './logo.svg';
import './App.css';
import Main_Project from './component/Main/Main_Project';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './component/Cart/Cart'
import Pay from './component/Pay/Pay'
import Info_Main from './component/Info/Info_Main';
import Info_MainAddress from './component/Info/Info_MainAddress';
import Info_MainEditPW from './component/Info/Info_MainEditPW';
import Pay_success from './component/Pay/Pay_success';
import DetailOfProduct from './component/Product_Detail/DetailOfProduct';
import LoginRegister from './component/LoginRegister/LoginRegister';
import React, { useEffect } from 'react';
import { refreshToken} from './services/authenticationService';
import { getTokenExpiry} from './services/localStorageService'; // Đảm bảo import đúng
import AdminDashboard from './component/AdminDashboard/AdminDashboard';
import Authenticate from './component/LoginRegister/Authenticate';
import UpdateInfoUser from './component/LoginRegister/UpdateInfoUser';
function App() {

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const tokenExp = getTokenExpiry(); 
      const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
  
      if (tokenExp && (tokenExp - currentTime < 120)) { // Nếu còn dưới 2 phút
          try {
              await refreshToken(); // Gọi hàm làm mới token
          } catch (error) {
              console.error("Lỗi khi làm mới token:", error);
              // Thêm logic xử lý khi không thể làm mới token (đăng xuất, thông báo người dùng, ...)
          }
      }
  };

    const interval = setInterval(checkAndRefreshToken, 60000); // Kiểm tra mỗi phút
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main_Project />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pay' element={<Pay />} />
          <Route path='/myinfo' element={<Info_Main />} />
          <Route path='/address' element={<Info_MainAddress />} />
          <Route path='/pw' element={<Info_MainEditPW />} />
          <Route path='/success' element={<Pay_success />} />
          <Route path="/detail/:id" element={<DetailOfProduct />} />
          <Route path='/admin' element={<AdminDashboard/>}/>
          <Route path='/info' element={<Info_Main/>}/>
          <Route path='/updateInfoUser' element={<UpdateInfoUser />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
